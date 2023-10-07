import './doctorCard.css'
import { useNavigate } from 'react-router-dom'

const DoctorCard = (props) => {
    const { doctor } = props
    const navigate = useNavigate()

    return (
        <div
            className='doctor-card'
            onClick={() => {
                navigate(`/doctor-info/${doctor.id}`)
            }}>
            <h3>Dr. {doctor.name}</h3>
            <p>{doctor.speciality}</p>
            <p>Hourly Rate: {doctor.hourly_rate}</p>
        </div>
    )
}

export default DoctorCard
