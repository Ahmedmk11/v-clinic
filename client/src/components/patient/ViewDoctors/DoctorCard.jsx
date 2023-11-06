import './doctorCard.css'
import { useNavigate } from 'react-router-dom'

const DoctorCard = ({ doctor, discount }) => {
    const navigate = useNavigate()

    return (
        <div
            className='doctor-card'
            onClick={() => {
                navigate(`/patient/doctor-info/${doctor.id}`, {
                    state: { discount },
                })
            }}>
            <h3>Dr. {doctor.name}</h3>
            <p>
                <strong>Speciality: </strong>
                {doctor.speciality}
            </p>
            <p>
                <strong>Session Price: </strong>
                {((doctor?.hourly_rate * 1.1).toFixed(0) * discount).toFixed(
                    0
                )}{' '}
                EGP
            </p>
            <button className='view-records-btn button'>View Doctor</button>
        </div>
    )
}

DoctorCard.defaultProps = {
    discount: 1,
}

export default DoctorCard
