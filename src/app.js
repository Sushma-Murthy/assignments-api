import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../swagger.js'
import v1AssignmentRoutes from './routes/v1/assignments.routes.js'

const PORT = process.env.NODE_PORT || 8080

export const app = express()

app.use(express.json())

app.use(cors())
app.options('*', cors())

app.use('/api/v1/', v1AssignmentRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument.default))

app.listen(PORT, () => {
    console.log(`Application started and listening on port ${PORT}`)
})
