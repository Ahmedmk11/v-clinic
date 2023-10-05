import express from 'express'
import UserModel from '../models/userModel.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        // Use Mongoose to find all users
        const users = await UserModel.find()
        res.status(200).json(users)
    } catch (err) {
        console.error('Error fetching users:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

export default router
