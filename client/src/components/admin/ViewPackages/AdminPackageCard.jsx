import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
const AdminPackageCard = ({ Package }) => {
    const navigate = useNavigate()
    const handleSubmit = () => {
        navigate(`/admin/package/${Package._id}`)
    }
    return (
        <div className='card'>
            <h3>{Package.name}</h3>
            <p>
                <strong>Price: </strong> {Package.price} L.E.
            </p>
            <p>
                <strong>Session Discount: </strong>
                {Package.sessionDiscount}%
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

export default AdminPackageCard
