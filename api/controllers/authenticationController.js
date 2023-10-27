import PatientModel from '../models/patientModel.js'
import DoctorModel from '../models/doctorModel.js'
import adminModel from '../models/adminModel.js'

import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import dotenv from 'dotenv'

import jwt from 'jsonwebtoken'

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const currentDir = dirname(currentFilePath)

dotenv.config({ path: path.join(currentDir, '.env') })

async function login(req, res) {
    try {
        const username = req.body.username
        const password = req.body.password
        const remember = req.body.remember
        const role = req.body.role

        const user =
            role === 'patient'
                ? await PatientModel.findOne({ username: username })
                : role === 'doctor'
                ? await DoctorModel.findOne({ username: username })
                : await adminModel.findOne({ username: username })
        if (!user) {
            return res
                .status(404)
                .json({ message: 'Invalid username or password' })
        }
        const isMatch = await user.comparePassword(password, user.password)
        if (!isMatch) {
            return res
                .status(404)
                .json({ message: 'Invalid username or password' })
        }
        const token = jwt.sign(
            { userId: user._id, role },
            process.env.JWT_SECRET,
            { expiresIn: remember ? '30d' : '5s' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: false,
            maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 0,
        })

        return res.status(200).json({ token, data: { user } })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

function getCurrUser(req, res) {
    console.log('reqreq', req.cookies)
    const token = req.cookies.token

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log('User from JWT: ', decoded)
            res.status(200).json(decoded)
        } catch (error) {
            console.error('Error decoding JWT: ', error)
            res.status(500).json({ error: 'Failed to decode JWT' })
        }
    } else {
        res.status(400).json({ error: 'No JWT token found in cookies' })
    }
}

export { login, getCurrUser }
