import express from 'express'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../swagger.js'
import assignmentRoutes from './routes/assignments.routes.js'

const PORT = process.env.NODE_PORT || 3000

export const app = express()

app.use(express.json())
app.use(assignmentRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument.default))

app.listen(PORT, () => {
    console.log(`Application started and listening on port ${PORT}`)
})
