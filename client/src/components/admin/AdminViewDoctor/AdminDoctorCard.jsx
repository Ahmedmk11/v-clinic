import { useNavigate } from 'react-router-dom'
const AdminDoctorCard = ({ doctor }) => {
const navigate = useNavigate()
    const handleSubmit = () => {
        navigate(`/admin/doctor/${doctor._id}`)
    }
    return (
        <div className='card' onClick={handleSubmit}>
            <h3>{doctor.username}</h3>
            <p><strong>ID: </strong>{doctor._id}</p>
            <p><strong>Status: </strong>{doctor.status}</p>
            <p><strong>Name: </strong>{doctor.name}</p>
            <p><strong>Education: </strong>{doctor.education}</p>
            <p><strong>Speciality: </strong>{doctor.speciality}</p>
            <button className='view-records-btn button'>View More Info</button>
        </div>
    )
}

export default AdminDoctorCard
