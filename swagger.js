export default {
    swagger: '2.0',
    info: {
        version: '1.0.0',
        title: 'Assignments API',
        description: 'App to create and fetch Assignments',
        contact: {
            email: 'SM@gmail.com',
        },
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT',
        },
    },
    host: 'localhost:8080',
    basePath: '/api/v1/',
    schemes: ['http'],
    paths: {
        '/assignments': {
            post: {
                summary: 'Create an assignment',
                description: 'Create an assignment',
                produces: ['application/json'],
                consumes: ['application/json'],
                parameters: [
                    {
                        in: 'body',
                        name: 'body',
                        description: 'assignment object',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: {
                                assignment: {
                                    type: 'object',
                                    $ref: '#/definitions/Assignment',
                                },
                            },
                        },
                    },
                ],
                responses: {
                    201: {
                        description: 'resource created',
                        schema: {
                            $ref: '#definitions/AssignmentResponse',
                        },
                    },
                    422: {
                        description: 'Validation error',
                        schema: {
                            $ref: '#/definitions/InvalidResponse',
                        },
                    },
                    500: {
                        description: 'Generic error',
                        schema: {
                            $ref: '#/definitions/InvalidResponse',
                        },
                    },
                },
            },
        },
    },
    definitions: {
        Assignment: {
            type: 'object',
            properties: {
                name: { type: 'string', required: true },
                title: { type: 'string', required: true },
                description: { type: 'string', required: true },
                type: { type: 'string', required: true },
                duration: { type: 'number', required: true },
                tags: { type: 'string' },
            },
        },
        AssignmentResponse: {
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        InvalidResponse: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                name: { type: 'string' },
                status: { type: 'number' },
            },
        },
    },
}
