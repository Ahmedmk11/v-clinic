import './patientAppointments.css'
import AppointmentsList from '../../components/AppointmentsList/AppointmentsList.jsx'

const PatientAppointments = () => {
    // REQ 23, view all appointments, filter by date and status
    return (
        <>
            <div>Patient Appointments</div>
            <AppointmentsList />
        </>
    )
}

export default PatientAppointments
