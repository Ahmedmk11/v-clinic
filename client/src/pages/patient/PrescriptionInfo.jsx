import PrescriptionContext from '../../contexts/SelectedPrescription'
import { useContext } from 'react'
import MedicationCard from '../../components/patient/PrescriptionInfo/MedicationCard'
const PrescriptionInfo = () => {
    const { SelectedPrescription } = useContext(PrescriptionContext)

    return (
        <div className='page'>
            <div className='primary-container'>
                <h2>Selected Prescription</h2>
                <div className='sub-container'>
                    <h2>{SelectedPrescription.name}</h2>
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
                        {SelectedPrescription.medications?.length}
                    </p>
                    <p>
                        <strong>Notes: </strong>
                        {SelectedPrescription.notes || 'No notes'}
                    </p>
                </div>
                <div className='sub-container'>
                    <h2>Medications</h2>
                    <div className='medical-history-view'>
                        {SelectedPrescription.medications?.map((medication) => (
                            <MedicationCard
                                key={medication._id}
                                medication={medication}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PrescriptionInfo
