// --------------------------------------------------
// Imports, Initialization and CORS configuration
// --------------------------------------------------

import express from 'express'
import cors from 'cors'
import adminRoutes from './routes/adminRoutes.js'
import patientRoutes from './routes/patientRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'
import { connectToDatabase } from './database.js'

const app = express()
const port = process.env.PORT || 3000

const corsOptions = {
    origin: ['http://127.0.0.1:5174', 'http://localhost:5174'],
    methods: '*',
    credentials: true,
}

app.use(express.json())
app.use(cors(corsOptions))
app.use('/api/admin', adminRoutes)
app.use('/api/patient', patientRoutes)
app.use('/api/doctor', doctorRoutes)

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})
