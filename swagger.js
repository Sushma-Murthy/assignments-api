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
    host: 'localhost:3000',
    basePath: '/api',
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
                        description: 'Invalid status',
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
                name: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
                type: { type: 'string' },
                duration: { type: 'number' },
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
                message: { type: 'array' },
                name: { type: 'string' },
                status: { type: 'number' },
            },
        },
    },
}
