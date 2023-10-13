import { useNavigate } from 'react-router-dom'
const AdminPackageCard = ({ Package }) => {
    console.log(Package)
const navigate = useNavigate()
    const handleSubmit = () => {
        navigate(`/admin/package/${Package._id}`)
    }
    return (
        <div className='card' onClick={handleSubmit}>
            <h3>{Package.name}</h3>
            <p><strong>Price: </strong> {Package.price} L.E.</p>
            <p><strong>Session Discount: </strong>{Package.sessionDiscount}%</p>
            <button className='view-records-btn button'>View More Info</button>
        </div>
    )
}

export default AdminPackageCard
