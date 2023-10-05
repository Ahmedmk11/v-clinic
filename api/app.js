// --------------------------------------------------
// Imports, Initialization and CORS configuration
// --------------------------------------------------

import express from 'express'
import cors from 'cors'
import patientRoutes from './routes/patientRoutes.js'
import { connectToDatabase } from './database.js'

const app = express()
const port = process.env.PORT || 10000

const corsOptions = {
    origin: ['http://127.0.0.1:5174', 'http://localhost:5174'],
    methods: '*',
    credentials: true,
}

app.use(cors(corsOptions))
app.use('/api/patient', patientRoutes)

// --------------------------------------------------
// Mongoose
// --------------------------------------------------

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})
