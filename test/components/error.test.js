import { ValidatorError, GenericError } from '../../src/components/error'

describe('error object creation', () => {
    let validationError
    let genericError

    it('validation error', () => {
        validationError = new ValidatorError('invalid input')
        expect(validationError.message).toMatch(/invalid input/)
        expect(validationError.status).toEqual(422)
        expect(validationError.name).toMatch(/ValidatorError/)
    })

    it('generic error', () => {
        genericError = new GenericError('processing error')
        expect(genericError.message).toMatch(/processing error/)
        expect(genericError.status).toEqual(500)
        expect(genericError.name).toMatch(/GenericError/)
    })
})
