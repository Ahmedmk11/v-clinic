import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
const AdminDoctorCard = ({ doctor }) => {
    const navigate = useNavigate()
    const handleSubmit = () => {
        navigate(`/admin/doctor/${doctor._id}`)
    }
    return (
        <div className='card'>
            <h3>{doctor.username}</h3>
            <p>
                <strong>ID: </strong>
                {doctor._id}
            </p>
            <p>
                <strong>Status: </strong>
                {doctor.status}
            </p>
            <p>
                <strong>Name: </strong>
                {doctor.name}
            </p>
            <p>
                <strong>Education: </strong>
                {doctor.education}
            </p>
            <p>
                <strong>Speciality: </strong>
                {doctor.speciality}
            </p>
            <Button
                onClick={handleSubmit}
                type='primary'
                style={{
                    marginLeft: '65%',
                }}>
                View More Info
            </Button>
        </div>
    )
}

export default AdminDoctorCard
