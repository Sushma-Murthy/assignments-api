import url from 'url'
import { validate, filterUnwanted } from '../components/validator.js'
import _ from 'lodash'
import { acceptedQuery } from '../components/validator.js'

export default function requestValidator(req, res, next) {
    const parsedUrl = url.parse(req.url, true)
    if (parsedUrl.pathname === '/api/assignments') {
        switch (req.method) {
            case 'POST':
                createAssignmentValidator(req, res, next)
                break
            case 'GET':
                fetchAssignmentsValidator(req, res, next)
                break
        }
    }
}

function createAssignmentValidator(req, res, next) {
    const data = filterUnwanted(req.body.assignment)
    try {
        if (validate(data)) {
            res.locals.filteredData = structureReqData(data)
            next()
        }
    } catch (e) {
        console.log(e)
        return res.status(e.status).send(e)
    }
}

function fetchAssignmentsValidator(req, res, next) {
    const queryParams = req.query

    if (_.isEmpty(queryParams)) {
        return res.status(422).send({
            message: `One or more query params expected, Accepted queries list: ${acceptedQuery}`,
        })
    }

    const isValidQuery = Object.keys(queryParams).every((param) => {
        return acceptedQuery.includes(param)
    })

    if (!isValidQuery) {
        return res.status(422).send({
            message: `Incorrect query, Accepted queries list: ${acceptedQuery}`,
        })
    }
    res.locals.filters = structureReqData(req.query)
    next()
}

function structureReqData(reqData) {
    const structuredReqData = {}
    for (let item in reqData) {
        if (item === 'tags') {
            structuredReqData[item] = reqData[item]
                .replace(/[\[\]]+/g, '')
                .split(',')
        } else {
            structuredReqData[item] = reqData[item]
        }
    }
    return structuredReqData
}
