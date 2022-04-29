import fs from 'fs'
import path from 'path'
import {
    getAssignment,
    createAssignment,
} from '../../../src/components/assignments/service'

describe('create assignment', () => {
    let assignment = {
        name: 'assignment 1',
        title: 'assignment title',
        description: 'assignment description',
        type: 'assignment type',
        duration: 10,
        tags: ['tag1', 'tag2'],
    }

    beforeEach(() => {
        fs.writeFileSync(
            path.join(process.cwd(), process.env.DATA_FILE_PATH),
            JSON.stringify([])
        )
        assignment = {}
    })

    it('create valid assignment', () => {
        return createAssignment(assignment).then((response) => {
            expect(response).toMatch(/id-/)
        })
    })

    it('error while creating an assignment', () => {
        jest.mock('fs')
        fs.writeFile = jest.fn()
        fs.writeFile.mockReturnValue(new Error('data file error'))

        return createAssignment(assignment).catch((e) => {
            expect(e.name).toMatch(/GenericError/)
        })
    })
})

describe('get assignments', () => {
    beforeAll(() => {
        const mockData = [
            {
                id: 'id-mycustomid',
                name: 'assignment 1',
                title: 'assignment title',
                description: 'assignment description',
                type: 'assignment type',
                duration: 10,
                tags: ['tag1', 'tag2'],
            },
            {
                name: 'assignment 3',
                title: 'assignment title',
                description: 'assignment description',
                type: 'assignment type',
                duration: 2,
                tags: ['tag3'],
            },
            {
                name: 'assignment 2',
                title: 'assignment title',
                description: 'assignment description',
                type: 'assignment type',
                duration: 5,
                tags: ['tag2', 'tag5'],
            },
        ]
        fs.writeFileSync(
            path.join(process.cwd(), process.env.DATA_FILE_PATH),
            JSON.stringify(mockData)
        )
    })

    it('get assignment by Id', () => {
        return getAssignment({ id: 'id-mycustomid' }).then((res) => {
            expect(res).toBeDefined()
            expect(res).toEqual([
                {
                    id: 'id-mycustomid',
                    name: 'assignment 1',
                    title: 'assignment title',
                    description: 'assignment description',
                    type: 'assignment type',
                    duration: 10,
                    tags: ['tag1', 'tag2'],
                },
            ])
        })
    })

    it('get assignment by tags', () => {
        return getAssignment({ tags: ['tag2', 'tag5'] }).then((res) => {
            expect(res).toBeDefined()
            expect(res).toEqual([
                {
                    id: 'id-mycustomid',
                    name: 'assignment 1',
                    title: 'assignment title',
                    description: 'assignment description',
                    type: 'assignment type',
                    duration: 10,
                    tags: ['tag1', 'tag2'],
                },
                {
                    name: 'assignment 2',
                    title: 'assignment title',
                    description: 'assignment description',
                    type: 'assignment type',
                    duration: 5,
                    tags: ['tag2', 'tag5'],
                },
            ])
        })
    })

    it('get assignment by Id & tags', () => {
        return getAssignment({ id: 'id-mycustomid', tags: ['tag2'] }).then(
            (res) => {
                expect(res).toBeDefined()
                expect(res).toEqual([
                    {
                        id: 'id-mycustomid',
                        name: 'assignment 1',
                        title: 'assignment title',
                        description: 'assignment description',
                        type: 'assignment type',
                        duration: 10,
                        tags: ['tag1', 'tag2'],
                    },
                ])
            }
        )
    })

    it('error while fetching assignments', () => {
        jest.mock('fs')
        fs.writeFile = jest.fn()
        fs.writeFile.mockReturnValue(new Error('data file error'))

        return getAssignment({ tags: ['tag1'] }).catch((e) => {
            expect(e.name).toMatch(/GenericError/)
        })
    })
})
