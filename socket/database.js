import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const currentDir = dirname(currentFilePath)

dotenv.config({ path: path.join(currentDir, '.env') })

async function connectToDatabase() {
    try {
        const uri = process.env.CONN_STRING
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected to MongoDB')
    } catch (err) {
        console.error('Error connecting to MongoDB:', err)
    }
}

export { connectToDatabase }
