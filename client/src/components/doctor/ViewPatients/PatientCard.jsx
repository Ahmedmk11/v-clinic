import { useNavigate } from 'react-router-dom'
import calcAge from '../../../utils/calcAge'
import { useContext } from 'react'
import SelectedPatientContext from '../../../contexts/SelectedPatient'

const PatientCard = ({ patient }) => {
    const { setSelectedPatient } = useContext(SelectedPatientContext)
    const navigate = useNavigate()
    const handlePatientSelect = () => {
        setSelectedPatient(patient)
        navigate(`/doctor/patient/info`)
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
