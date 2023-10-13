import { useNavigate } from 'react-router-dom'
const AdminPatientCard = ({ patient }) => {
const navigate = useNavigate()
    const handleSubmit = () => {
        navigate(`/admin/patient/${patient._id}`)
    }
    return (
        <div className='card' onClick={handleSubmit}>
            <h3>{patient.username}</h3>
            <p><strong>ID: </strong>{patient._id}</p>
            <p><strong>Name: </strong>{patient.name}</p>
            <button className='view-records-btn button'>View Patient</button>
        </div>
    )
}

export default AdminPatientCard
