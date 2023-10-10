import './doctorCard.css'
import { useNavigate } from 'react-router-dom'

const DoctorCard = (props) => {
    const { doctor } = props
    const navigate = useNavigate()

    return (
        <div
            className='doctor-card'
            onClick={() => {
                navigate(`/patient/doctor-info/${doctor.id}`)
            }}>
            <h3>Dr. {doctor.name}</h3>
            <p><strong>Speciality: </strong>{doctor.speciality}</p>
            <p><strong>Hourly Rate: </strong>{doctor.hourly_rate}</p>
        </div>
    )
}

export default DoctorCard
