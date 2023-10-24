import { useNavigate } from 'react-router-dom'
import calcAge from '../../../utils/calcAge'

const PatientCard = ({ patient }) => {
   
    const navigate = useNavigate()
    const handlePatientSelect = () => {
        navigate(`/doctor/patient/info/${patient._id}`)
    }
    return (
        <div className='card' onClick={handlePatientSelect}>
            <h3>{patient.name}</h3>
            <p>
                <strong>Age: </strong>
                {calcAge(patient.birthdate)}
            </p>
            <p>
                <strong>Gender: </strong>
                {patient.gender}
            </p>
            <p>
                <strong>Last Visit: </strong>
                {patient.lastVisit
                    ? new Date(patient.lastVisit).toLocaleString()
                    : 'No previous visits'}
            </p>
            <p>
                <strong>Next Appointment: </strong>
                {patient.nextAppointment
                    ? new Date(patient.nextAppointment).toLocaleString()
                    : 'No upcoming appointments'}
            </p>
            <button className='view-records-btn button'>View Records</button>
        </div>
    )
}

export default PatientCard
