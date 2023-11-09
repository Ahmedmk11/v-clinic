import PatientModel from '../models/patientModel.js'
import AppointmentModel from '../models/appointmentsModel.js'
import FamilyMemberModel from '../models/familyMemberModel.js'
import PrescriptionModel from '../models/prescriptionsModel.js'
import MedicalHistoryModel from '../models/medicalHistoryModel.js'
import packageModel from '../models/packageModel.js'
import multer from 'multer'
import crypto from 'crypto'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import FamilyModel from '../models/familyModel.js'

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const __dirname = dirname(currentFilePath)

// --------------------------------------------------
// Multer
// --------------------------------------------------

const patientStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/patientUploads')
    },
    filename: (req, file, cb) => {
        const fileName = crypto.randomBytes(16).toString('hex')
        const extension = file.mimetype.split('/')[1]
        cb(null, `${fileName}.${extension}`)
    },
})

const patientUpload = multer({ storage: patientStorage })

async function createPatient(req, res) {
    try {
        const {
            username,
            name,
            email,
            password,
            birthdate,
            gender,
            phoneNumber,
            emergencyName,
            emergencyPhoneNumber,
        } = req.body

        let linkingCode

        do {
            linkingCode = crypto.randomBytes(16).toString('hex')
        } while (await PatientModel.findOne({ linkingCode }))

        const newPatient = new PatientModel({
            username,
            name,
            email,
            password,
            birthdate,
            gender,
            phoneNumber,
            emergencyName,
            emergencyPhoneNumber,
            linkingCode,
        })

        await newPatient.save()
        const MedicalHistory = new MedicalHistoryModel({
            patient_id: newPatient._id,
        })
        await MedicalHistory.save()
        res.status(201).json(newPatient)
    } catch (err) {
        console.error('Error creating patient:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function getPatients(req, res) {
    try {
        const patients = await PatientModel.find()
        res.status(200).json(patients)
    } catch (err) {
        console.error('Error fetching patients:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function getPatientByID(req, res) {
    try {
        const { id } = req.params
        let patient = await PatientModel.findById(id)
            .populate('prescriptions')
            .populate('medicalHistory')
            .populate('package')
        patient = {
            ...patient._doc,
            prescriptions: patient.prescriptions,
            medicalHistory: patient.medicalHistory,
        }
        res.status(200).json(patient)
    } catch (err) {
        console.error('Error fetching patient:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function getPatientsByDoctorID(req, res) {
    try {
        const { id } = req.params
        const appointments = await AppointmentModel.find({
            doctor_id: id,
        })
        const patientIds = appointments.map(
            (appointment) => appointment.patient_id
        )
        let patients = await PatientModel.find({
            _id: { $in: patientIds },
        })
            .populate('prescriptions')
            .populate('medicalHistory')
        patients = patients.map((patient) => {
            return {
                ...patient._doc,
                prescriptions: patient.prescriptions,
                medicalHistory: patient.medicalHistory,
                nextAppointment: getPatientNextAppointment(
                    patient.id,
                    appointments
                ),
                lastVisit: getPatientLastVisit(patient.id, appointments),
            }
        })
        res.status(200).json(patients)
    } catch (err) {
        console.error('Error fetching patients by doctor id:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

function getPatientLastVisit(patientId, appointments) {
    const patientAppointemnts = appointments.filter(
        (appointment) =>
            appointment.patient_id == patientId && appointment.date < new Date()
    )
    let lastVisit = null
    for (let i = 0; i < patientAppointemnts.length; i++)
        if (lastVisit === null || patientAppointemnts[i].date > lastVisit)
            lastVisit = patientAppointemnts[i].date

    return lastVisit
}

function getPatientNextAppointment(patientId, appointments) {
    const patientAppointemnts = appointments.filter(
        (appointment) =>
            appointment.patient_id == patientId &&
            appointment.date >= new Date()
    )
    let nextAppointment = null
    for (let i = 0; i < patientAppointemnts.length; i++)
        if (
            nextAppointment === null ||
            patientAppointemnts[i].date < nextAppointment
        )
            nextAppointment = patientAppointemnts[i].date

    return nextAppointment
}

async function getPatientAppointments(req, res) {
    try {
        let patient = await PatientModel.findById(req.params.id)
        if (patient) {
            patient = await patient.populate('appointments')
            res.json(patient.appointments)
        } else res.status(404).json({ message: 'Patient not found' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getPatientPrescription(req, res) {
    try {
        const patient = await PatientModel.findById(req.params.id)
        if (patient) {
            const populatedPatient = await patient.populate({
                path: 'prescriptions',
                populate: {
                    path: 'doctor_id',
                    model: 'Doctor',
                },
            })
            let prescriptions = populatedPatient.prescriptions.map(
                (prescription) => {
                    const { doctor_id, ...rest } = prescription._doc
                    return {
                        ...rest,
                        doctorName: prescription.doctor_id.name,
                    }
                }
            )
            res.json(prescriptions)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

async function getFamilyMembers(req, res) {
    try {
        let patient = await PatientModel.findById(req.params.id)
        if (patient) {
            patient = await patient.populate('familymembers')
            res.json(patient.familymembers)
        } else res.status(404).json({ message: 'Patient not found' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function populateFamilyMembers(req, res) {
    try {
        const newFamilyMember = new FamilyMemberModel(req.body)
        await newFamilyMember.save()
        let patient = await PatientModel.findById(req.params.id)
        if (patient) {
            patient = await patient.populate('familymembers')
            res.json(patient.familymembers)
        } else res.status(404).json({ message: 'Patient not found' })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

async function getPatientDiscount(req, res) {
    try {
        let patient = await PatientModel.findById(req.params.id)
        if (patient) {
            patient = await patient.populate('package')
            res.json(patient.package)
        } else res.status(404).json({ message: 'Patient not found' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function buyPackageWallet(req, res) {
    try {
        const patientID = req.params.id
        const packageID = req.body.packageID

        const patient = await PatientModel.findById(patientID)
        const currPackage = await packageModel.findById(packageID)

        patient.wallet -= currPackage.price
        await patient.save()
        res.status(200).json({
            message: 'Package updated successfully',
            wallet: patient.wallet,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function addPackage(req, res) {
    try {
        const patientID = req.params.id
        const packageID = req.body.packageID

        if (packageID !== '-1') {
            await PatientModel.findByIdAndUpdate(patientID, {
                package: packageID,
            })
        } else {
            let patient = await PatientModel.findById(patientID)
            if (patient) {
                patient.package = null
                await patient.save()
                console.log('Reference to Package removed.')
            } else {
                res.status(404).json({ message: 'Patient not found' })
                return
            }
        }

        const updatedPatient =
            await PatientModel.findById(patientID).populate('package')

        res.status(200).json({
            message: 'Package updated successfully',
            name: updatedPatient.package ? updatedPatient.package.name : null,
            package: updatedPatient.package,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//@ desc add medical history to patient
//@route POST /api/patients/add-medical-history
const addMedicalHistory = async (req, res) => {
    try {
        const { medicalHistory } = req.body
        console.log(medicalHistory)
        const newMedicalHistory = new MedicalHistoryModel(medicalHistory)

        await newMedicalHistory.save()
        res.status(201).json(newMedicalHistory)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

//@ desc update medical history to patient
//@route PUT /api/patients/update-medical-history/:id
const updateMedicalHistory = async (req, res) => {
    try {
        const { id } = req.params
        const { medicalHistory } = req.body

        const updatedMedicalHistory =
            await MedicalHistoryModel.findOneAndUpdate(
                { patient_id: id },
                medicalHistory,
                { new: true }
            )

        res.status(201).json(updatedMedicalHistory)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

//@desc add appointment to patient
//@route POST /api/patients/add-appointment
const addAppointment = async (req, res) => {
    try {
        const appointment = new AppointmentModel(req.body)
        await appointment.save()
        res.status(201).json(appointment)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

const savePatientfiles = patientUpload.array('files')
// @desc upload patient files
// @route POST /api/patients//upload-health-records
const uploadPatientFiles = async (req, res) => {
    try {
        const { id } = req.body
        const files = req.files
        if (!files?.length)
            return res.status(400).json({ message: 'No files uploaded' })
        const patient = await PatientModel.findById(id)
        if (patient) {
            const newFilePaths = files.map((file) => {
                return { path: file.path, originalname: file.originalname }
            })
            patient.health_records = [
                ...patient.health_records,
                ...newFilePaths,
            ]
            await patient.save()
            res.status(201).json({
                message: 'Files uploaded successfully',
                UploadedMedicalRecords: patient.health_records,
            })
        } else res.status(404).json({ message: 'Patient not found' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

// @desc remove uploaded file
// @route DELETE /api/patients/remove-uploaded-file
const removeUploadedFile = async (req, res) => {
    try {
        const { id } = req.query
        const patient = await PatientModel.findById(id)
        if (patient) {
            const { filePath } = req.query
            const newHealthRecords = patient.health_records.filter(
                (file) => file.path !== filePath
            )
            patient.health_records = newHealthRecords
            await patient.save()
            const filePathToRemove = path.join(__dirname, `../${filePath}`)
            if (fs.existsSync(filePathToRemove))
                fs.unlinkSync(filePathToRemove, (err) => {
                    if (err) throw err
                })
            console.log('File removed successfully')
            res.status(200).json({
                message: 'File removed successfully',
                health_records: patient.health_records,
            })
        } else res.status(404).json({ message: 'Patient not found' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

const addToFamily = async (req, res) => {
    try {
        const { id } = req.params
        const { email, phoneNumber, linkingCode, relation, gender } = req.body
        const valid = await PatientModel.findOne({
            $and: [
                {
                    $or: [{ email }, { phoneNumber }],
                },
                { linkingCode },
            ],
        })

        if (!valid) {
            return res.status(403).json("You can't add this member")
        }

        let family = await FamilyModel.findOne({ 'member.id': id })

        if (!family) {
            family = await FamilyModel.findOne({ 'member.id': valid._id })
        }

        if (!family) {
            family = new FamilyModel({
                member: [
                    {
                        id,
                        relation:
                            relation === 'wife'
                                ? 'husband'
                                : relation === 'husband'
                                ? 'wife'
                                : gender === 'male'
                                ? 'husband'
                                : 'wife',
                    },
                    { id: valid._id, relation },
                ],
            })
        } else {
            const isAlreadyMember1 = family.member.some((member) =>
                member.id.equals(valid._id)
            )
            const isAlreadyMember2 = family.member.some((member) =>
                member.id.equals(id)
            )

            if (!isAlreadyMember1) {
                family.member.push({ id: valid._id, relation })
            }

            if (!isAlreadyMember2) {
                family.member.push({
                    id: id,
                    relation: gender === 'male' ? 'husband' : 'wife',
                })
            }

            if (isAlreadyMember1 && isAlreadyMember2) {
                return res.status(403).json('This member already exists')
            }
        }

        await family.save()
        res.status(201).json(family)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

async function getFamily(req, res) {
    try {
        const { id } = req.params
        let family = await FamilyModel.findOne({ 'member.id': id })
        family.member=family.member.filter((p)=>p.id!=id)
        if (family) {
            let names = []
            // eslint-disable-next-line no-undef
            await Promise.all(
                family.member.filter((p)=>p.id!=id).map(async (p) => {
                    let tmp = await PatientModel.findById(p.id)
                    if (tmp) {
                        names.push(tmp.name)
                    } else {
                        res.status(404).json({ message: 'no name found' })
                    }
                })
            )
           const familyMemberProfiles=[]
            for(let i=0;i<family.member.length;i++){
              familyMemberProfiles.push(await PatientModel.findById(family.member[i].id).populate('package'))
            }
            res.json({
                familyMembers: family.member,
                names: names,
                familyMemberProfiles:familyMemberProfiles
            })
        } else {
            res.json(null)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export {
    createPatient,
    getPatients,
    getPatientByID,
    getPatientsByDoctorID,
    getPatientAppointments,
    getPatientPrescription,
    getFamilyMembers,
    populateFamilyMembers,
    getPatientDiscount,
    addPackage,
    addMedicalHistory,
    updateMedicalHistory,
    addAppointment,
    savePatientfiles,
    uploadPatientFiles,
    removeUploadedFile,
    addToFamily,
    getFamily,
    buyPackageWallet,
}
