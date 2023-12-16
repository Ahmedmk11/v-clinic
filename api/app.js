// --------------------------------------------------
// Imports, Initialization and CORS configuration
// --------------------------------------------------

import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import patientRoutes from './routes/patientRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import NotificationsModel from './models/notificationsModel.js'
import chatRoutes from './routes/chatRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import videoChatRoutes from './routes/videoChatRoutes.js'
import { connectToDatabase } from './database.js'
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import './controllers/packageController.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// --------------------------------------------------
// Initialization and CORS configuration
// --------------------------------------------------

const app = express()
const port = process.env.PORT || 3000

const corsOptions = {
    origin: ['http://127.0.0.1:5174', 'http://localhost:5174'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use((req, res, next) => {
    next()
})

// --------------------------------------------------
// Routes
// --------------------------------------------------

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/patient', patientRoutes)
app.use('/api/doctor', doctorRoutes)
app.use('/api/appointment', appointmentRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/videoChat', videoChatRoutes)
app.use('/api/uploads/doctorUploads', express.static('uploads/doctorUploads')) //move to doctorRoutes
app.use('/api/uploads/patientUploads', express.static('uploads/patientUploads')) //move to patientRoutes

// --------------------------------------------------
// Server
// --------------------------------------------------

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})

