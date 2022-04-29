import { validate, filterUnwanted } from '../../src/components/validator'

describe('validate input', () => {
    it('assignment input without required values', () => {
        try {
            const isValid = validate({
                tags: 'tag1, tag2',
            })
        } catch (e) {
            expect(e.message).toBeDefined()
        }
    })

    it('valid assignment input', () => {
        expect(
            validate({
                name: 'assignment 1',
                title: 'assignment title',
                description: 'assignment description',
                type: 'assignment type',
                duration: 10,
                tags: 'tag1, tag2',
            })
        ).toBeTruthy()
    })
})

describe('filter junk data from req body', () => {
    it('create assignment req body', () => {
        expect(
            filterUnwanted({
                name: 'assignment 1',
                junk1: '`28274230=p-',
                title: 'assignment title',
                description: 'assignment description',
                type: 'assignment type',
                duration: 10,
                junk2: 'ajsdhajklfla',
                tags: 'tag1, tag2',
            })
        ).toEqual({
            name: 'assignment 1',
            title: 'assignment title',
            description: 'assignment description',
            type: 'assignment type',
            duration: 10,
            tags: 'tag1, tag2',
        })
    })
})
