import './patientCard.css'
import { useNavigate } from 'react-router-dom'
import { calcAge } from '../PatientInfo/PatientInfo'

const PatientCard = ({ patient }) => {
    const navigate = useNavigate()
    const handlePatientSelect = () => {
        navigate(`/doctor/patient/${patient.id}`)
    }
    return (
        <div className='patient-card' onClick={handlePatientSelect}>
            <h3>{patient.name}</h3>
            <p><strong>Age: </strong>{calcAge(patient.birthdate)}</p>
            <p><strong>Gender: </strong>{patient.gender}</p>
            <p><strong>Last Visit: </strong>{patient.lastVisit|| "No previous visits"}</p>
            <p><strong>Next Appointment: </strong>{patient.nextAppointment|| "No upcoming appointments"}</p>
            <button className='view-records-btn button'>View Records</button>
        </div>
    )
}

export default PatientCard
