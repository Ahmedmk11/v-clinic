import PatientModel from '../models/patientModel.js'
import AppointmentModel from '../models/appointmentsModel.js'
import DoctorModel from '../models/doctorModel.js'
import PrescriptionModel from '../models/prescriptionsModel.js'
import NotificationsModel from '../models/notificationsModel.js'
import nodemailer from 'nodemailer'

const cancelAppointmentDoctor = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointment = await AppointmentModel.findById(appointmentId)
        if (!appointment) {
            return res.status(400).json({ message: 'Appointment not found' })
        }
        await AppointmentModel.findByIdAndUpdate(appointmentId, {
            status: 'cancelled',
        })
        const patient = await PatientModel.findByIdAndUpdate(
            appointment.patient_id
        )
        const doctor = await DoctorModel.findByIdAndUpdate(
            appointment.doctor_id
        )
        patient.wallet = patient.wallet + appointment.fee
        doctor.wallet = doctor.wallet - appointment.fee * 0.9
        await patient.save()
        await doctor.save()

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
            subject: `Your appointment with Dr. ${doctor.name} is cancelled`,
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
                    <p>Your appointment with Dr. ${doctor.name} on ${new Date(
                        appointment.date
                    ).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })} has been cancelled as the doctor is unable to conduct the appointment, you will be refunded.</p>
                    <p><strong>We apologise for this inconveince, feel free to book another session with our wide range of doctors.</strong></p>
                    <p><strong>If you think this is a mistake please contact us at this email.</strong></p>
                </body>
            </html>
                `,
        }

        const mailOptions2 = {
            from: 'virtualclinicmail@gmail.com',
            to: doctor.email,
            subject: `Your appointment with ${patient.name} is cancelled`,
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
                    <p>Dear ${doctor.name},</p>
                    <p>Your appointment with ${patient.name} on ${new Date(
                        appointment.date
                    ).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })} has been cancelled by as per your request.</p>
                    <p><strong>If you think this is a mistake please contact us at this email.</strong></p>
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
            message_patient: `Your appointment with Dr. ${
                doctor.name
            } on ${new Date(appointment.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            })} at ${new Date(appointment.date).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            })} has been cancelled, check your email for more information.`,
            message_doctor: `Appointment with ${patient.name} on ${new Date(
                appointment.date
            ).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            })} at ${new Date(appointment.date).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            })} has been cancelled as per your request.`,
        })
        await notification.save()

        return res.status(200).json({
            message: 'Appointment cancelled successfully',
            wallet: doctor.wallet,
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const cancelAppointmentPatient = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointment = await AppointmentModel.findById(appointmentId)
        if (!appointment) {
            return res.status(400).json({ message: 'Appointment not found' })
        }
        const Appointment = await AppointmentModel.findByIdAndUpdate(
            appointmentId,
            { status: 'cancelled' }
        )
        const patient = await PatientModel.findById(
            appointment.patient_id
        )
        const doctor = await DoctorModel.findById(
            appointment.doctor_id
        )
        if (appointment.start_time - Date.now() > 86400000) {
            patient.wallet = patient.wallet + appointment.fee
            doctor.wallet = doctor.wallet - appointment.fee * 0.9
            appointment.fee = 0
            appointment.save()
            await patient.save()
            await doctor.save()
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
            to: patient.email,
            subject: `Your appointment with Dr. ${doctor.name} is cancelled`,
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
                    <p>Your appointment with Dr. ${doctor.name} on ${new Date(
                        appointment.date
                    ).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })} has been cancelled as you have requested.</p>
                    <p><strong>If you think this is a mistake please contact us at this email.</strong></p>
                </body>
            </html>
                `,
        }

        const mailOptions2 = {
            from: 'virtualclinicmail@gmail.com',
            to: doctor.email,
            subject: `Your appointment with ${patient.name} is cancelled`,
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
                    <p>Dear ${doctor.name},</p>
                    <p>Your appointment with ${patient.name} on ${new Date(
                        appointment.date
                    ).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })} has been cancelled by them.</p>
                    <p><strong>If you think this is a mistake please contact us at this email.</strong></p>
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
            message_patient: `Your appointment with Dr. ${
                doctor.name
            } on ${new Date(appointment.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            })} at ${new Date(appointment.date).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            })} has been cancelled as per your request.`,
            message_doctor: `${
                patient.name
            } has cancelled their appointment on ${new Date(
                appointment.date
            ).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            })} at ${new Date(appointment.date).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            })}`,
        })
        await notification.save()

        return res.status(200).json({
            message: 'Appointment cancelled successfully',
            wallet: patient.wallet,
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const rescheduleAppointment = async (req, res) => {
    try {
        const { appointmentId, date, start_time, end_time } = req.body
        const appointment = await AppointmentModel.findById(appointmentId)
        const patient = await PatientModel.findById(appointment.patient_id)
        const doctor = await DoctorModel.findById(appointment.doctor_id)
        if (!appointment) {
            return res.status(400).json({ message: 'Appointment not found' })
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
            to: patient.email,
            subject: `Your appointment with Dr. ${doctor.name} is rescheduled`,
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
                    <p>Your appointment with Dr. ${doctor.name} on ${new Date(
                        appointment.date
                    ).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })} has been rescheduled to ${new Date(
                        date
                    ).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })}
                    at ${new Date(start_time).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                    .</p>
                </body>
            </html>
                `,
        }

        const mailOptions2 = {
            from: 'virtualclinicmail@gmail.com',
            to: doctor.email,
            subject: `Your appointment with ${patient.name} has been rescheduled`,
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
                    <p>Dear ${doctor.name},</p>
                    <p>Your appointment with ${patient.name} on ${new Date(
                        appointment.date
                    ).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })} has been rescheduled to ${new Date(
                        date
                    ).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })}
                    at ${new Date(start_time).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
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
            message_patient: `Your appointment with Dr. ${
                doctor.name
            } on ${new Date(appointment.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            })} has been rescheduled to ${new Date(date).toLocaleDateString(
                'en-US',
                {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                }
            )}
            at ${new Date(start_time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            })}`,
            message_doctor: ` Your appointment with ${
                patient.name
            } has been rescheduled to ${new Date(date).toLocaleDateString(
                'en-US',
                {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                }
            )}
            at ${new Date(start_time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            })}`,
        })
        await notification.save()
        await AppointmentModel.findByIdAndUpdate(appointmentId, {
            date: date,
            start_time: start_time,
            end_time: end_time,
            status: 'rescheduled',
        })

        return res
            .status(200)
            .json({ message: 'Appointment rescheduled successfully' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const requestFollowUp = async (req, res) => {
    try {
        const { patient_id, doctor_id, date, start_time, end_time } = req.body
        const followUp = await AppointmentModel.create({
            patient_id,
            doctor_id,
            date,
            start_time,
            end_time,
            status: 'pending',
        })
        await followUp.populate([
            {
                path: 'doctor_id',
                model: 'Doctor',
            },
            {
                path: 'patient_id',
                model: 'Patient',
            },
        ])
        return res
            .status(200)
            .json({ message: 'Follow up requested successfully', followUp })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const acceptFollowUp = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointment = await AppointmentModel.findById(appointmentId)
        if (!appointment) {
            return res.status(400).json({ message: 'Appointment not found' })
        }
        await AppointmentModel.findByIdAndUpdate(appointmentId, {
            status: 'upcoming',
        })
        res.status(200).json({ message: 'Follow up accepted successfully' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const rejectFollowUp = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointment = await AppointmentModel.findById(appointmentId)
        if (!appointment) {
            return res.status(400).json({ message: 'Appointment not found' })
        }
        await AppointmentModel.findByIdAndUpdate(appointmentId, {
            status: 'rejected',
        })
        res.status(200).json({ message: 'Follow up rejected successfully' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const updatePrescription = async (req, res) => {
    try {
        const { appointmentId, prescription } = req.body
        const appointment = await AppointmentModel.findById(appointmentId)
        if (!appointment) {
            return res.status(400).json({ message: 'Appointment not found' })
        }
        const getPrescription = await PrescriptionModel.findOne({
            appointment_id: appointmentId,
        })
        if (!getPrescription) {
            await PrescriptionModel.create({
                appointment_id: appointmentId,
                patient_id: appointment.patient_id,
                doctor_id: appointment.doctor_id,
                medications: prescription.medications,
                notes: prescription.notes,
            })
        } else {
            await PrescriptionModel.findByIdAndUpdate(getPrescription._id, {
                medications: prescription.medications,
                notes: prescription.notes,
                date: Date.now(),
            })
        }
        res.status(200).json({ message: 'Prescription updated successfully' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getPrescription = async (req, res) => {
    try {
        const appointmentId = req.params.id
        const getPrescription = await PrescriptionModel.findOne({
            appointment_id: appointmentId,
        })
        if (!getPrescription) {
            return res.status(400).json({ message: 'Prescription not found' })
        } else {
            return res.status(200).json(getPrescription)
        }
    } catch (error) {
        console.log(error)
    }
}

export {
    cancelAppointmentDoctor,
    cancelAppointmentPatient,
    rescheduleAppointment,
    requestFollowUp,
    acceptFollowUp,
    rejectFollowUp,
    updatePrescription,
    getPrescription,
}
