import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import PatientModel from '../models/patientModel.js'
import DoctorModel from '../models/doctorModel.js'
import adminModel from '../models/adminModel.js'

const verifyToken = expressAsyncHandler(async (req, res, next) => {
    const token = req.headers.authentication.split(' ')[1]

    if (!token) {
        return next(new Error(401, 'Forbidden access, Login required'))
    }

    let decodedToken
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return next(new Error(401, 'Forbidden access, Login required'))
    }

    const user = await PatientModel.findById(decodedToken.userId)
    if (!user) {
        user = await DoctorModel.findById(decodedToken.userId)
        if (!user) {
            user = await adminModel.findById(decodedToken.userId)
            if (!user) {
                return next(new Error(404, 'Your account no longer exists.'))
            }
        }
    }

    req.user = user
    next()
})

export { verifyToken }
