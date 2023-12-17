import PatientModel from '../models/patientModel.js'
import AppointmentModel from '../models/appointmentsModel.js'
import FamilyMemberModel from '../models/familyMemberModel.js'
import PrescriptionModel from '../models/prescriptionsModel.js'
import MedicalHistoryModel from '../models/medicalHistoryModel.js'
import DoctorModel from '../models/doctorModel.js'
import packageModel from '../models/packageModel.js'
import multer from 'multer'
import crypto from 'crypto'
import puppeteer from 'puppeteer'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import FamilyModel from '../models/familyModel.js'
import stripe from 'stripe'
import dotenv from 'dotenv'
import medicineModel from '../models/medicineModel.js'
import NotificationsModel from '../models/notificationsModel.js'
import nodemailer from 'nodemailer'
import Pharmacist from '../models/pharmacistModel.js'
import Order from '../models/orderModel.js'
import Email from '../utils/email.js'

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const __dirname = dirname(currentFilePath)
dotenv.config({ path: path.join(__dirname, '.env') })

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
            nid,
            birthdate,
            gender,
            phoneNumber,
            emergencyName,
            emergencyPhoneNumber,
            emergencyRelation,
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
            nid,
            birthdate,
            gender,
            phoneNumber,
            emergencyName,
            emergencyPhoneNumber,
            linkingCode,
            emergencyRelation,
        })

        await newPatient.save()
        const MedicalHistory = new MedicalHistoryModel({
            patient_id: newPatient._id,
        })
        await MedicalHistory.save()
        res.status(201).json(newPatient)
    } catch (err) {
        console.error('Error creating patient:', err)
        res.status(500).json(err)
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
            patient = await patient.populate({
                path: 'appointments',
                populate: {
                    path: 'doctor_id',
                    model: 'Doctor',
                },
            })
            res.json(patient.appointments)
        } else res.status(404).json({ message: 'Patient not found' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getPatientPrescriptions(req, res) {
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

async function payAppointmentWallet(req, res) {
    try {
        const patientID = req.params.id
        const deduction = req.body.deduction
        const doctorID = req.body.doctorID
        const ret = await PatientModel.findByIdAndUpdate(
            patientID,
            { $inc: { wallet: -deduction } },
            { new: true }
        )
        await DoctorModel.findByIdAndUpdate(
            doctorID,
            { $inc: { wallet: deduction * 0.9 } } //-10% V-Clinic fees :)
        )
        res.status(200).json({ wallet: ret.wallet })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

async function buyPackageWallet(req, res) {
    try {
        const patientID = req.params.id
        const packageID = req.body.packageID

        const patient = await PatientModel.findById(patientID)
        const currPackage = await packageModel.findById(packageID)
        console.log('here')
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
        const date = new Date()
        date.setMonth(date.getMonth() + 12)
        date.setHours(0, 0, 0, 0)
        if (packageID !== '-1') {
            await PatientModel.findByIdAndUpdate(patientID, {
                package: packageID,
                packageRenewalDate: date,
                packageStatus: 'Active',
            })
        } else {
            let patient = await PatientModel.findById(patientID)
            if (patient) {
                patient.packageStatus = 'Inactive'
                if (
                    new Date().setHours(0, 0, 0, 0) >=
                    new Date(patient.packageRenewalDate).setHours(0, 0, 0, 0)
                )
                    patient.package = null
                await patient.save()
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
            renewalDate: updatedPatient.packageRenewalDate,
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

        const doctor = await DoctorModel.findById(appointment.doctor_id)
        const patient = await PatientModel.findById(appointment.patient_id)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'virtualclinicmail@gmail.com',
                pass: process.env.GMAIL_PASSWORD,
            },
        })

        const mailOptions = {
            from: 'virtualclinicmail@gmail.com',
            to: patient.email,
            subject: `Your appointment with Dr. ${doctor.name}`,
            html: `
            <!DOCTYPE html>
            <html lang="en" style="padding: 40px; width: 100%;">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Appointment</title>
                </head>
                <body>
                    <p>Dear ${patient.name},</p>
                    <p>You have an appointment with Dr. ${
                        doctor.name
                    } on ${new Date(appointment.date).toLocaleDateString(
                        'en-US',
                        {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        }
                    )} at ${new Date(appointment.date).toLocaleTimeString(
                        'en-US',
                        {
                            hour: '2-digit',
                            minute: '2-digit',
                        }
                    )}.</p>
                    <p><strong>If you think this is a mistake please login to your account and cancel the appointment or contact us.</strong></p>
                </body>
            </html>
                `,
        }

        const mailOptions2 = {
            from: 'virtualclinicmail@gmail.com',
            to: doctor.email,
            subject: `Your appointment with ${patient.name}`,
            html: `
            <!DOCTYPE html>
            <html lang="en" style="padding: 40px; width: 100%;">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Appointment</title>
                </head>
                <body>
                    <p>Dear Dr. ${doctor.name},</p>
                    <p>You have an appointment with ${
                        patient.name
                    } on ${new Date(appointment.date).toLocaleDateString(
                        'en-US',
                        {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        }
                    )} at ${new Date(appointment.date).toLocaleTimeString(
                        'en-US',
                        {
                            hour: '2-digit',
                            minute: '2-digit',
                        }
                    )}.</p>
                    <p><strong>If you think this is a mistake please login to your account and cancel the appointment or contact us.</strong></p>
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

        transporter.sendMail(mailOptions2, function (error) {
            if (error) {
                console.log(error)
                res.status(500).json({ message: 'Error sending email' })
            }
        })

        const notification = new NotificationsModel({
            date: appointment.date,
            doctor_id: appointment.doctor_id,
            patient_id: appointment.patient_id,
            appointment_id: appointment._id,
            message_patient: `You have an appointment with Dr. ${
                doctor.name
            } on ${new Date(appointment.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            })} at ${new Date(appointment.date).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            })}`,
            message_doctor: `You have an appointment with ${
                patient.name
            } on ${new Date(appointment.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            })} at ${new Date(appointment.date).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            })}`,
        })
        await notification.save()
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
            res.status(200).json({
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
        if (family) {
            family.member = family.member.filter((p) => p.id != id)
            const familyMemberProfiles = []
            for (let i = 0; i < family.member.length; i++) {
                familyMemberProfiles.push(
                    await PatientModel.findById(family.member[i].id).populate(
                        'package'
                    )
                )
            }
            res.json({
                familyMembers: family.member,
                familyMemberProfiles: familyMemberProfiles,
            })
        } else {
            res.json([])
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function stripeWebhook(request, response) {
    const event = request.body

    const metadata = event.data.object.metadata
    if (event.type == 'checkout.session.completed') {
        if (metadata.webhook === '0') {
            try {
                const ret = await PatientModel.findById(metadata.patientID)
                const date = new Date()
                date.setMonth(date.getMonth() + 12)
                date.setHours(0, 0, 0, 0)
                ret.package = metadata.packageID
                ret.packageRenewalDate = date
                ret.packageStatus = 'Active'
                await ret.save()
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const newAppointment = {
                    patient_id: metadata.patient_id,
                    doctor_id: metadata.doctor_id,
                    date: metadata.start_time,
                    start_time: metadata.start_time,
                    end_time: metadata.end_time,
                    fee: metadata.deduction,
                }
                const appointment = new AppointmentModel(newAppointment)
                await appointment.save()
                await DoctorModel.findByIdAndUpdate(
                    metadata.doctor_id,
                    { $inc: { wallet: metadata.deduction * 0.9 } } //-10% V-Clinic fees :)
                )
            } catch (error) {
                console.log(error)
            }
        }
    }
    // switch (event.type) {
    //     case 'checkout.session.completed':
    //            try {
    //                 const ret = await PatientModel.findById(metadata.patientID)
    //                 ret.package = metadata.packageID
    //                 await ret.save()
    //            } catch (error) {
    //                 console.log(error)
    //            }
    //         break;
    //   default:
    // }

    response.json({ received: true })
}

async function payAppointmentCard(req, res) {
    try {
        const { id } = req.params
        const price = req.body.price
        const date = req.body.date
        const startTime = req.body.startTime
        const endTime = req.body.endTime
        const doctorInfo = await DoctorModel.findById(req.body.doctorID)
        const stripeInstance = stripe(process.env.STRIPE_PRIVATE_KEY)

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'egp',
                        product_data: {
                            name: `Appointment with Dr. ${doctorInfo.name}`,
                            description: `Reserve an appointment with Dr. ${doctorInfo.name}, ${doctorInfo.speciality} on ${date}`,
                        },
                        unit_amount: price * 100,
                    },
                    quantity: 1,
                },
            ],
            success_url: `http://localhost:5174/patient/doctor-info/${doctorInfo._id}`,
            cancel_url: `http://localhost:5174/patient/doctor-info/${doctorInfo._id}`,
            metadata: {
                patient_id: id,
                doctor_id: req.body.doctorID,
                start_time: startTime,
                end_time: endTime,
                deduction: price,
                webhook: 1,
            },
        })
        res.status(200).json({ ret: session.url })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
async function packagePayCard(req, res) {
    try {
        const { id } = req.params
        const packageInfo = await packageModel.findById(req.body.id)
        const stripeInstance = stripe(process.env.STRIPE_PRIVATE_KEY)

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'egp',
                        product_data: {
                            name: packageInfo.name + ' Package',
                            description: `The ${packageInfo.name} Package provides you with a ${packageInfo.sessionDiscount}% discount on sessions, ${packageInfo.medicineDiscount}% discount on medicine and ${packageInfo.familySubsDiscount}% discount on family members subscriptions`,
                        },
                        unit_amount: packageInfo.price * 100,
                    },
                    quantity: 1,
                },
            ],
            success_url: `http://localhost:5174/patient/profile`,
            cancel_url: 'http://localhost:5174/patient/profile',
            metadata: {
                patientID: id,
                packageID: req.body.id,
                webhook: 0,
            },
        })
        res.status(200).json({ ret: session.url })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function cancelAutoRenewal(req, res) {
    try {
        const { patient_id } = req.body
        const patient = await PatientModel.findById(patient_id)
        patient.isAutoRenewalBlocked = false
        await patient.save()
        res.status(200).json({ message: 'Auto Renewal Canceled Successfully' })
    } catch {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getFamilyMembersAppointments = async (req, res) => {
    try {
        const { id } = req.params
        let family = await FamilyModel.find({})
        family = family.filter((family) =>
            family.member.some((member) => member.id == id)
        )
        if (family.length == 0) return res.status(200).json([])
        else family = family[0]
        const familyMembers = family.member
            .filter((familyMember) => familyMember.id != id)
            .map((member) => member.id)
        const appointments = await AppointmentModel.find({
            patient_id: { $in: familyMembers },
        })
            .populate('doctor_id')
            .populate('patient_id')
        res.status(200).json(appointments)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const generatePrescriptionPDF = async (req, res) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('about:blank')

    const prescription = req.query.prescription
    console.log('prescription', prescription)

    let medicationsArr = []

    prescription.medications.forEach((medication) => {
        medicationsArr.push({
            name: medication.name,
            dosage: medication.dosage,
            frequency: medication.frequency,
            duration: medication.duration,
        })
    })

    while (medicationsArr.length < prescription.medications.length) {
        // eslint-disable-next-line no-undef
        await new Promise((resolve) => setTimeout(resolve, 100))
    }

    console.log('medicationsArr', medicationsArr)

    const content = `
        <div class="prescription-container" style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333;">Prescription Name: ${
                prescription.name ?? 'No Name Found'
            }</h2>
            <p style="margin-bottom: 10px;">Patient Name: ${
                prescription.patientName ?? 'No Name Found'
            }</p>
            <p style="margin-bottom: 10px;">Doctor Name: ${
                prescription.doctorName ?? 'No Name Found'
            }</p>
            <p style="margin-bottom: 10px;">Status: ${
                prescription.status ?? 'No Status Found'
            }</p>
            <p style="margin-bottom: 10px;">Date: ${new Date(
                prescription.date
            ).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            })}</p>
            <p style="margin-bottom: 10px;">Notes: ${
                prescription.notes ?? 'No Notes'
            }</p>
            <p style="margin-bottom: 10px; margin-top: 20px;"><strong>Medications</strong></p>
            <div>
                ${medicationsArr
                    .map(
                        (medicine) => `
                            <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px;">
                                <p>Medicine: ${
                                    medicine.name ?? 'No Medicine Name Found'
                                }</p>
                                <p>Dosage: ${
                                    medicine.dosage ?? 'No Dosage Found'
                                }</p>
                                <p>Frequency: ${
                                    medicine.frequency ?? 'No Frequency Found'
                                }</p>
                                <p>Duration: ${
                                    medicine.duration ?? 'No Duration Found'
                                }</p>
                            </div>
                            `
                    )
                    .join('')}
            </div>
        </div>
    `

    await page.setContent(content)

    const pdfBuffer = await page.pdf({ format: 'A4' })
    await browser.close()
    res.set({
        'Content-Type': 'application/pdf',
        'Content-Length': pdfBuffer.length,
    })
    res.send(pdfBuffer)
}

// send patient_id in body
//send prescription_id in body
//send paymentMethod in body
const createPrecriptionOrder = async (req, res) => {
    try {
        const patient = await PatientModel.findById(req.body.patient_id)
        if (!patient) {
            return res.status(400).json({ message: 'Patient not found' })
        }
        patient.deliveryAddress.forEach((address) => {
            if (address.is_default == true) req.body.address = address
        })
        if (!req.body.address) {
            return res.status(400).json({ message: 'Address not found' })
        }
        const prescription = await PrescriptionModel.findById(
            req.body.prescription_id
        )
        prescription.medications.quantity = 1
        let price = 0
        for (let i = 0; i < prescription.medications.length; i++) {
            const item = prescription.medications[i]
            const medicine = await medicineModel.findById(item.medicine_id)
            if (!medicine) {
                return res.status(400).json({ message: 'Medicine not found' })
            }
            let p = medicine.price
            price += p * item.quantity
        }
        let medicines = []
        for (let i = 0; i < prescription.medications.length; i++) {
            const item = prescription.medications[i]
            const medicine = await medicineModel.findById(item.medicine_id)
            if (!medicine) {
                return res.status(400).json({ message: 'Medicine not found' })
            }
            if (medicine.availableQuantity < item.quantity) {
                return res
                    .status(400)
                    .json({ message: `${medicine.name} out of stock` })
            }
            medicine.singleQuantity = item.quantity
            medicines.push(medicine)
        }
        if (req.body.paymentMethod == 'wallet') {
            if (patient.wallet < price) {
                return res
                    .status(400)
                    .json({ message: 'Not enough money in wallet' })
            }
            patient.wallet -= price
            await patient.save()
        }
        let outOfStockMedicines = []
        for (let i = 0; i < prescription.medications.length; i++) {
            const item = prescription.medications[i]
            const medicine = await medicineModel.findById(item.medicine_id)
            medicine.availableQuantity -= item.quantity
            if (medicine.availableQuantity <= 0) {
                outOfStockMedicines.push(medicine)
            }
            medicine.sales += medicine.price * item.quantity
            await medicine.save()
        }
        const updatedMedications = prescription.medications.map((item) => {
            const { medicine_id, quantity } = item
            return { medicine_id, quantity }
        })
        const order = new Order({
            patient_id: patient._id,
            items: updatedMedications,
            total_price: price,
            status: 'Confirmed',
            address: req.body.address,
            paymentMethod: req.body.paymentMethod,
        })
        await order.save()
        if (outOfStockMedicines.length > 0) {
            sendNotification(outOfStockMedicines)
        }
        res.status(201).json({ order, outOfStockMedicines })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const sendNotification = async (outOfStockMedicines) => {
    const pharmacists = await Pharmacist.find()
    pharmacists.forEach(async (pharmacist) => {
        await new Email(
            pharmacist,
            outOfStockMedicines
        ).sendOutOfStockMedicines()
    })
}

const getNotifications = async (req, res) => {
    try {
        const { pid } = req.params
        const type = req.query.type

        let notifications = await NotificationsModel.find(
            type == 'patient' ? { patient_id: pid } : { doctor_id: pid }
        )

        // res.status(200).json(notifications) filter it by notification date, only return notifications with date not yet reached

        notifications = notifications.filter(
            (notification) => notification.date > new Date()
        )
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const removeNotification = async (req, res) => {
    try {
        const { nid, id } = req.params

        let notifications = await NotificationsModel.findById(nid)

        if (notifications.patient_id == id) {
            notifications.patient_id = null
            await notifications.save()
        }

        if (notifications.doctor_id == id) {
            notifications.doctor_id = null
            await notifications.save()
        }

        res.status(200).json(notifications)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getPrescriptionPrice = async (req, res) => {
    try {
        const { prescription_id } = req.params
        const prescription = await PrescriptionModel.findById(prescription_id)
        const patient = await PatientModel.findById(prescription.patient_id)

        const patient_package = await packageModel.findById(patient.package)
        let medicineDiscount = 0
        if (patient_package) {
            medicineDiscount = patient_package.medicineDiscount
        }
        let price = 0
        for (let i = 0; i < prescription.medications.length; i++) {
            const item = prescription.medications[i]
            const medicine = await medicineModel.findById(item.medicine_id)
            console.log(medicine)
            if (!medicine) {
                return res.status(400).json({ message: 'Medicine not found' })
            }
            let p = medicine.price
            price += p * 1
        }
        const newPrice = (price * (1 - medicineDiscount / 100)).toFixed(2)
        res.status(200).json({ oldPrice: price, newPrice: newPrice })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const checkUsernameAvailability = async (req, res) => {
    try {
        const { username } = req.params
        console.log(username)
        const isTaken = await PatientModel.findOne({ username: username })
        console.log(isTaken)
        if (!isTaken) {
            res.status(202).json({ message: 202 })
        } else {
            res.status(200).json({ message: 200 })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const checkEmailAvailability = async (req, res) => {
    try {
        const { email } = req.params
        console.log(email)
        const isTaken = await PatientModel.findOne({ email: email })
        console.log(isTaken)
        if (!isTaken) {
            res.status(202).json({ message: 202 })
        } else {
            res.status(200).json({ message: 200 })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const checkPhoneAvailability = async (req, res) => {
    try {
        const { phone } = req.params
        console.log(phone)
        const isTaken = await PatientModel.findOne({ phoneNumber: phone })
        console.log(isTaken)
        if (!isTaken) {
            res.status(202).json({ message: 202 })
        } else {
            res.status(200).json({ message: 200 })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const checkNidAvailability = async (req, res) => {
    try {
        const { nid } = req.params
        console.log(nid)
        const isTaken = await PatientModel.findOne({ nid: nid })
        console.log(isTaken)
        if (!isTaken) {
            res.status(202).json({ message: 202 })
        } else {
            res.status(200).json({ message: 200 })
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
    getPatientPrescriptions,
    getFamilyMembers,
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
    packagePayCard,
    stripeWebhook,
    payAppointmentWallet,
    payAppointmentCard,
    cancelAutoRenewal,
    getFamilyMembersAppointments,
    generatePrescriptionPDF,
    getNotifications,
    removeNotification,
    getPrescriptionPrice,
    checkUsernameAvailability,
    checkEmailAvailability,
    checkPhoneAvailability,
    checkNidAvailability,
}
