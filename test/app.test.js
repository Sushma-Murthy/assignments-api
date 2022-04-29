import fs from 'fs'
import path from 'path'
import request from 'supertest'
import express from 'express'
import router from '../src/routes/assignments.routes'

const app = new express()
app.use(express.json())
app.use('/', router)

describe.only('assignment api routes', () => {
    beforeAll(() => {
        fs.writeFileSync(
            path.join(process.cwd(), process.env.DATA_FILE_PATH),
            JSON.stringify([])
        )
    })

    it('create new assignment', async () => {
        const res = await request(app)
            .post('/api/assignments')
            .send({
                assignment: {
                    id: 'id-customId',
                    description: 'assignment description',
                    duration: 3,
                    name: 'assignment 123',
                    tags: 'customtag',
                    title: 'assignment title',
                    type: 'assignment type',
                },
            })

        expect(res.header['content-type']).toBe(
            'application/json; charset=utf-8'
        )
        expect(res.statusCode).toBe(201)
        expect(res.body.message).toMatch(/Assignment created, referenceId: id-/)
    })

    it('create new assignment with invalid data', async () => {
        const res = await request(app)
            .post('/api/assignments')
            .send({
                assignment: {
                    description: 'assignment description',
                    duration: 3,
                    tags: 'tag123',
                    title: 'assignment title',
                    type: 'assignment type',
                },
            })

        expect(res.header['content-type']).toBe(
            'application/json; charset=utf-8'
        )
        expect(res.statusCode).toBe(422)
        expect(res.body.message).toBeDefined()
    })

    it('get assignments filter by Id', async () => {
        const res = await request(app).get('/api/assignments?id=id-customId')
        expect(res.header['content-type']).toBe(
            'application/json; charset=utf-8'
        )
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([
            {
                id: 'id-customId',
                description: 'assignment description',
                duration: 3,
                name: 'assignment 123',
                tags: ['customtag'],
                title: 'assignment title',
                type: 'assignment type',
            },
        ])
    })

    it('get assignments filter by tags', async () => {
        const res = await request(app).get('/api/assignments?tags=customtag')
        expect(res.header['content-type']).toBe(
            'application/json; charset=utf-8'
        )
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([
            {
                id: 'id-customId',
                description: 'assignment description',
                duration: 3,
                name: 'assignment 123',
                tags: ['customtag'],
                title: 'assignment title',
                type: 'assignment type',
            },
        ])
    })

    it('get assignments with no filters', async () => {
        const res = await request(app).get('/api/assignments')
        expect(res.header['content-type']).toBe(
            'application/json; charset=utf-8'
        )
        expect(res.statusCode).toBe(422)
    })

    it('get assignments with incorrect filters', async () => {
        const res = await request(app).get('/api/assignments?type=online')
        expect(res.header['content-type']).toBe(
            'application/json; charset=utf-8'
        )
        expect(res.statusCode).toBe(422)
    })
})
