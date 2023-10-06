import mongoose from 'mongoose'
import adminModel from '../models/adminModel.js'
import DoctorModel from '../models/doctorModel.js'
import { getPatients } from './patientController.js'
import { getDoctors } from './doctorController.js'
import packageModel from '../models/packageModel.js'

/* -----------------admin funcs------------------------ */
const addAdmin = async (req, res) => {
    const fetchedAdmin = await adminModel.find()
    console.log(req.body)
    for (let i = 0; i < fetchedAdmin.length; i++)
        if (fetchedAdmin.at(i).Username === req.body.Username) {
            res.status(500).send({ message: 'this username is in use' })
            return
        }
    const newAdmin = new adminModel(req.body)
    newAdmin
        .save()
        .then((result) => res.status(200).send(result))
        .catch((err) =>
            res.staus(500).send({ error: 'failed to create admin' })
        )
}

const getAllAdmins = async (req, res) => {
    adminModel
        .find()
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(500).res.send(err))
}
/* -----------------admin funcs------------------------ */



/* -----------------user funcs------------------------ */
const getUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(500).send({ error: 'invalid id' })

    if (req.body.type === 'admin') {
        const ret = await adminModel.findById(id)
        if (ret) {
            res.status(200).json(ret)
        } else {
            res.status(404).send({ error: 'user not found' })
        }
    } else res.status(500).send({ error: 'invalid type of user' })
}

const removeUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(500).send({ error: 'invalid id' })

    if (req.body.type === 'admin') {
        const ret = await adminModel.findByIdAndRemove(id)
        if (ret) {
            res.status(200).json(ret)
        } else {
            res.status(404).send({ error: 'user not found' })
        }
    } else res.status(500).send({ error: 'invalid type of user' })
}
/* -----------------user funcs------------------------ */




/* -----------------Doctor funcs------------------------ */
const getDoctorRequest = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(500).send({ error: 'invalid id' })
    try {
        const ret = await DoctorModel.find({ _id: id, status: 'pending' })
        res.status(200).send(ret)
    } catch (error) {
        res.status(500).send({ err: 'database failed' })
    }
}

const getAllDoctorRequest = async (req, res) => {
    try {
        const ret = await DoctorModel.find({ status: 'pending' })
        res.status(200).send(ret)
    } catch (error) {
        res.status(503).send({ err: 'database failed' })
    }
}

const getAllDoctors = getDoctors
/* -----------------Doctor funcs------------------------ */



const getAllPatients = getPatients

const addPackage = async (req, res) => {
    const newPackage = new packageModel(req.body)
    try {
        const ret = await newPackage.save()
        res.status(200).send(ret)
    } catch (error) {
        res.status(500).send(error)
    }
}



const adminController = {
    addAdmin,
    getUser,
    removeUser,
    getAllAdmins,
    getAllPatients,
    getAllDoctors,
    getAllDoctorRequest,
    getDoctorRequest,
}
export default adminController
