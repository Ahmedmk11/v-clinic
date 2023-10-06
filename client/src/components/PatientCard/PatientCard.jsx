import './patientCard.css'
import { useNavigate } from 'react-router-dom'

const PatientCard = ({ patient }) => {
    const navigate = useNavigate()
    const handlePatientSelect = () => {
        navigate(`/doctor/patient/${patient.id}`)
    }
    return (
        <div className='patient-card' onClick={handlePatientSelect}>
            <h3>{patient.name}</h3>
            <p>Age: {patient.age}</p>
            <p>Contact: {patient.contact}</p>
            <p>Last Visit: {patient.lastVisit}</p>
            <p>Next Appointment: {patient.nextAppointment}</p>
            <button className='view-records-btn button'>View Records</button>
        </div>
    )
}

export default PatientCard
