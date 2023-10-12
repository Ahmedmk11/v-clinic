import PrescriptionContext from '../../context/Prescription'
import { useContext } from 'react'
import MedicationCard from '../../components/patient/ViewPrescriptions/MedicationCard'
const PrescriptionInfo = () => {
    const { SelectedPrescription } = useContext(PrescriptionContext)

    return (
        <div className='patient-info-container'>
            <h2>Selected Prescription</h2>
            <div className='patient-info'>
                <h3>{SelectedPrescription.name}</h3>
                <p>
                    <strong>Doctor: </strong>
                    {SelectedPrescription.doctorName}
                </p>
                <p>
                    <strong>Date: </strong>
                    {new Date(SelectedPrescription.date).toDateString()}
                </p>
                <p>
                    <strong>Status: </strong>
                    {SelectedPrescription.status}
                </p>
                <p>
                    <strong>No. of Medications: </strong>
                    {SelectedPrescription.medications.length}
                </p>
                <p>
                    <strong>Notes: </strong>{SelectedPrescription.notes|| "No notes"}
                </p>
            </div>
            <div className='patient-info'>
                <h3>Medications</h3>
                <div className='patient-list'>
                    {SelectedPrescription.medications.map((medication) => (
                        <MedicationCard
                            key={medication._id}
                            medication={medication}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default PrescriptionInfo
