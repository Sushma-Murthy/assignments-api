import express from 'express'
import _ from 'lodash'
import {
    createAssignment,
    getAssignment,
} from '../../components/assignments/service.js'
import requestValidator from '../../components/middleware.js'

const assignmentRoutes = express.Router()

assignmentRoutes.post('/assignments', requestValidator, async (_req, res) => {
    try {
        const referenceId = await createAssignment(res.locals.filteredData)
        console.log(`Assignment: referenceId ${referenceId}`)
        return res.status(201).send({
            message: `Assignment created, referenceId: ${referenceId}`,
        })
    } catch (e) {
        return res.status(e.status).send(e)
    }
})

assignmentRoutes.get('/assignments', requestValidator, async (_req, res) => {
    try {
        const assignments = await getAssignment(res.locals.filters)
        console.log(`Assignments by ${res.locals.filters}: ${assignments}`)
        return res.status(200).send(assignments)
    } catch (e) {
        return res.status(e.status).send(e)
    }
})

export default assignmentRoutes
