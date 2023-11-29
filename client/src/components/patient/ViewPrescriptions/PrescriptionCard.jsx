import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import PrescriptionContext from "../../../contexts/SelectedPrescription"
import { Button } from "antd"
const PrescriptionCard = ({ prescription }) => {
    const { setSelectedPrescription } = useContext(PrescriptionContext)
    const navigate = useNavigate()
    const handleSelect = () => {
        setSelectedPrescription(prescription)
        navigate('/patient/prescription-info')
    }
    return (
        <div className='card' onClick={handleSelect}>
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
            <div className="edit-buttons">
            <Button type="primary" >
                View Prescription
            </Button>
            </div>
        </div>
    )
}
export default PrescriptionCard
