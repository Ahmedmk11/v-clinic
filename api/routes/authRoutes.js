import express from 'express'

import { login, getCurrUser } from '../controllers/authenticationController.js'

const router = express.Router()

router.post('/login', login)
router.get('/get-curr-user', getCurrUser)

export default router
