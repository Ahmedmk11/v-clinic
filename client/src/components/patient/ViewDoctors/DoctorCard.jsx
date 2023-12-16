import { useNavigate } from 'react-router-dom'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import { Button } from 'antd'

const DoctorCard = ({ doctor, discount }) => {
    const navigate = useNavigate()

    return (
        <div className='card'>
            <h2>Dr. {doctor.name}</h2>
            <p>
                <strong>Speciality: </strong>
                {doctor.speciality}
            </p>
            <p>
                <strong>Session Price: </strong>
                <ConditionalRender condition={discount != 1}>
                    <span style={{ textDecoration: 'line-through' }}>
                        {doctor?.hourly_rate?.toFixed(0)}
                    </span>{' '}
                </ConditionalRender>
                $
                {((doctor?.hourly_rate * 1.1).toFixed(0) * discount).toFixed(0)}{' '}
            </p>
            <div className='edit-buttons'>
                <Button
                    type='primary'
                    onClick={() => {
                        navigate(`/patient/doctor-info/${doctor?._id}`, {
                            state: { discount },
                        })
                    }}>
                    View Doctor
                </Button>
            </div>
        </div>
    )
}

DoctorCard.defaultProps = {
    discount: 1,
}

export default DoctorCard
