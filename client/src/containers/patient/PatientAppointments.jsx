import './patientAppointments.css'
import AppointmentsList from '../../components/patient/PatientAppointments/AppointmentsList.jsx'

const PatientAppointments = () => {
    // REQ 23, view all appointments, filter by date and status DONE
    return (
        <div className='viewPatients-page'>
            <AppointmentsList />
        </div>
    )
}

export default PatientAppointments
