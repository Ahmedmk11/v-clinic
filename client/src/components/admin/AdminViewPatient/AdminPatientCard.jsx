import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
const AdminPatientCard = ({ patient }) => {
    const navigate = useNavigate()
    const handleSubmit = () => {
        navigate(`/admin/patient/${patient._id}`)
    }
    return (
        <div className='card'>
            <h3>{patient.username}</h3>
            <p>
                <strong>ID: </strong>
                {patient._id}
            </p>
            <p>
                <strong>Name: </strong>
                {patient.name}
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

export default AdminPatientCard
