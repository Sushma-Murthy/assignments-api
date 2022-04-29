import { promises as fs } from 'fs'
import _ from 'lodash'
import path from 'path'
import uniqid from 'uniqid'
import { GenericError } from '../error.js'
import Assignment from './model.js'

const dataFilePath = process.env.DATA_FILE_PATH || '/data.json'

console.log('data file path', dataFilePath)
async function loadAssignments() {
    try {
        // check if file exists - no return []
        const assignments = await fs.readFile(
            path.join(process.cwd(), dataFilePath)
        )
        console.log(`Loaded assignments ${assignments}`)
        return JSON.parse(assignments)
    } catch (e) {
        throw new GenericError(e)
    }
}

async function saveAssignments(assignments) {
    //TODO try catch
    await fs.writeFile(
        path.join(process.cwd(), dataFilePath),
        JSON.stringify(assignments)
    )
}

export async function createAssignment(newAssignment) {
    newAssignment.id = newAssignment.id || uniqid('id-')
    try {
        let assignments = await loadAssignments()
        assignments.push(new Assignment(newAssignment))
        await saveAssignments(assignments)
        return newAssignment.id
    } catch (e) {
        throw new GenericError(e)
    }
}

export async function getAssignment(filters) {
    try {
        const assignments = await loadAssignments()
        const data =
            filters.id && filters.tags
                ? filterByIdAndTags(assignments, filters)
                : filters.id
                ? filterById(assignments, filters.id)
                : filterByTags(assignments, filters.tags)
        return data
    } catch (e) {
        throw e
    }
}

function filterById(assignments, id) {
    return assignments.filter((assignment) => assignment.id === id)
}

function filterByTags(assignments, tags) {
    const assignmentsByTags = assignments.map((assignment) => {
        if (!_.isEmpty(_.intersection(assignment.tags, tags))) {
            return assignment
        }
    })
    return assignmentsByTags.filter((assignment) => assignment !== undefined)
}

function filterByIdAndTags(assignments, filters) {
    const assignmentsById = filterById(assignments, filters.id)
    const assignmentsByIdAndTags = filterByTags(assignmentsById, filters.tags)
    return assignmentsByIdAndTags
}
