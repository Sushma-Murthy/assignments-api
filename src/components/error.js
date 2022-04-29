export class ValidatorError {
    constructor(message) {
        this.message = message
        this.name = 'ValidatorError'
        this.status = 422
    }
}

export class GenericError {
    constructor(message) {
        this.message = message
        this.name = 'GenericError'
        this.status = 500
    }
}
