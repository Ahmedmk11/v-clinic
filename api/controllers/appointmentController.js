import PatientModel from '../models/patientModel.js'
import AppointmentModel from '../models/appointmentsModel.js'
import DoctorModel from "../models/doctorModel.js";

const cancelAppointmentDoctor = async (req, res) => {
    try{
        const {appointmentId} = req.body;
        const appointment = await AppointmentModel.findById(appointmentId);
        if(!appointment){
            return res.status(400).json({message: "Appointment not found"});
        }
        await AppointmentModel.findByIdAndUpdate(appointmentId, {status: "cancelled"});
       const patient= await PatientModel.findByIdAndUpdate(appointment.patient_id);
       const doctor= await DoctorModel.findByIdAndUpdate(appointment.doctor_id);
        patient.wallet=patient.wallet+ appointment.fee;
        doctor.wallet=doctor.wallet- appointment.fee*0.9;
        await patient.save();
        await doctor.save();
        return res.status(200).json({message: "Appointment cancelled successfully",wallet: doctor.wallet});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

const cancelAppointmentPatient = async (req, res) => {
    try{
        const {appointmentId} = req.body;
        const appointment = await AppointmentModel.findById(appointmentId);
        if(!appointment){
            return res.status(400).json({message: "Appointment not found"});
        }
       const Appointment= await AppointmentModel.findByIdAndUpdate(appointmentId, {status: "cancelled"});
       const patient= await PatientModel.findByIdAndUpdate(appointment.patient_id);
       const doctor= await DoctorModel.findByIdAndUpdate(appointment.doctor_id);
       if(appointment.start_time-Date.now()>86400000){
        patient.wallet=patient.wallet+ appointment.fee;
        doctor.wallet=doctor.wallet- appointment.fee*0.9;
        await patient.save();
        await doctor.save();
    }
        return res.status(200).json({message: "Appointment cancelled successfully",wallet: patient.wallet});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}


const rescheduleAppointment = async (req, res) => {
    try{
        const {appointmentId,date,start_time,end_time} = req.body;
        const appointment = await AppointmentModel.findById(appointmentId);
        if(!appointment){
            return res.status(400).json({message: "Appointment not found"});
        }
        await AppointmentModel.findByIdAndUpdate(appointmentId, {date: date,start_time: start_time,end_time: end_time,status: "rescheduled"});
    return res.status(200).json({message: "Appointment rescheduled successfully"});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}   

export {cancelAppointmentDoctor,
    cancelAppointmentPatient,
        rescheduleAppointment}