import PatientModel from '../models/patientModel.js'
import DoctorModel from '../models/doctorModel.js'
import adminModel from '../models/adminModel.js'

import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import dotenv from 'dotenv'

import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

import notp from 'notp'
import base32 from 'thirty-two'
import crypto from 'crypto'

import { changePasswordWithoutOldPassword } from '../utils/changePasswordWithoutOldPassword.js'
import { changePasswordWithOldPassword } from '../utils/changePasswordWithOldPassword.js'

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
            { expiresIn: remember ? '30d' : '2h' }
        )

        res.cookie('token_clinic', token, {
            httpOnly: true,
            maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000,
        })

        return res.status(200).json({ token, data: { user } })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function getCurrUser(req, res) {
    const token = req.cookies.token_clinic

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            res.status(200).json(decoded)
        } catch (error) {
            console.error('Error decoding JWT: ', error)
            res.status(500).json({ error: 'Failed to decode JWT' })
        }
    } else {
        res.status(400).json({ error: 'No JWT token found in cookies' })
    }
}

async function logout(req, res) {
    res.clearCookie('token_clinic')
    res.status(200).json({ message: 'Logged out' })
}

async function changePassword(req, res) {
    const id = req.body.id
    const email = req.body.email
    const role = req.body.role
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    let response

    if (oldPassword === 'rem') {
        response = await changePasswordWithoutOldPassword(
            email,
            role,
            newPassword
        )
    } else {
        response = await changePasswordWithOldPassword(
            id,
            role,
            oldPassword,
            newPassword
        )
    }

    if (response === 404) {
        return res.status(404).json({ message: 'User not found' })
    } else if (response === 403) {
        return res.status(403).json({ message: 'Invalid password' })
    } else if (response === 500) {
        return res.status(500).json({ message: 'Error changing password' })
    }

    return res.status(200).json({ message: 'Password changed' })
}

async function generateAndSendOTP(req, res) {
    const email = req.body.email

    const secret = crypto.randomBytes(10).toString('hex')
    const totp = notp.totp.gen(base32.encode(secret), { step: 600 })

    if (!totp || !secret) {
        return res.status(500).json({ message: 'Error generating OTP' })
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'virtualclinicmail@gmail.com',
            pass: process.env.GMAIL_PASSWORD,
        },
    })

    const mailOptions = {
        from: 'virtualclinicmail@gmail.com',
        to: email,
        subject: 'OTP for Password Reset',
        html: `
        <!DOCTYPE html>
        <html lang="en" style="padding: 40px; width: 100%;">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email</title>
            </head>
            <body>
                <h2>Your OTP is ${totp}</h2>

                <p><strong>If you think this is a mistake please login to your account and change the password or contact us.</strong></p>

                <p><strong>This OTP will expire in 10 minutes.</strong></p>
            </body>
        </html>
            `,
    }

    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log(error)
            res.status(500).json({ message: 'Error sending email' })
        }
    })

    res.status(200).json({ secret })
}

async function validateOTP(req, res) {
    const otp = req.body.otp
    const secret = req.body.secret

    const isValid = notp.totp.verify(otp, base32.encode(secret))

    if (isValid) {
        console.log('OTP is valid')
        res.status(200).json({ message: 'OTP is valid' })
    } else {
        console.log('OTP is invalid')
        res.status(403).json({ message: 'Invalid OTP' })
    }
}

export {
    login,
    logout,
    getCurrUser,
    changePassword,
    generateAndSendOTP,
    validateOTP,
}
