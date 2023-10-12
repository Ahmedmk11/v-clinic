import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import PrescriptionContext from "../../context/Prescription"
const PrescriptionCard = ({ prescription }) => {
    const { setSelectedPrescription } = useContext(PrescriptionContext)
    const navigate = useNavigate()
    const handleSelect = () => {
        setSelectedPrescription(prescription)
        navigate('/patient/prescription-info')
    }
    return (
        <div className='patient-card' onClick={handleSelect}>
            <h3>{prescription.name}</h3>
            <p>
                <strong>Doctor: </strong>
                {prescription.doctorName}
            </p>
            <p>
                <strong>Date: </strong>
                {new Date(prescription.date).toDateString()}
            </p>
            <p>
                <strong>Status: </strong>
                {prescription.status}
            </p>
            <p>
                <strong>No. of Medications: </strong>
                {prescription.medications.length}
            </p>
            <button className='view-records-btn button'>
                View Prescription
            </button>
        </div>
    )
}
export default PrescriptionCard
