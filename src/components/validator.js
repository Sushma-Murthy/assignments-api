import { Validator } from 'jsonschema'
import _ from 'lodash'
import { ValidatorError } from './error.js'

const validator = new Validator()

const acceptedAssignmentBody = [
    'id',
    'name',
    'title',
    'description',
    'type',
    'duration',
    'tags',
]

export const acceptedQuery = ['id', 'tags']

const assignmentSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
        },
        name: {
            type: 'string',
            required: true,
        },
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            required: true,
        },
        type: {
            type: 'string',
            required: true,
        },
        duration: {
            type: 'number',
            required: true,
        },
        tags: {
            type: 'string',
        },
    },
}

export function validate(instance) {
    const res = validator.validate(instance, assignmentSchema)
    if (_.isEmpty(res.errors)) {
        return true
    }
    throw new ValidatorError(res.errors.map((err) => err.stack))
}

export function filterUnwanted(reqBody) {
    let data = {}
    for (let item in reqBody) {
        if (acceptedAssignmentBody.includes(item)) {
            data[item] = reqBody[item]
        }
    }
    return data
}
