import MedicalHistory from "../../components/doctor/PatientInfo/MedicalHistory"
import { useContext } from "react"
import CurrUserContext from "../../contexts/CurrUser"
import ConditionalRender from "../../components/reusable/ConditionalRender/ConditionalRender"
import UploadMedicalRecords from "../../components/patient/HealthRecords/UploadMedicalRecords"
import ViewUploadedRecords from "../../components/patient/HealthRecords/ViewUploadedRecords"
const HealthRecords = () => {
    const { currUser: Patient , setCurrUser: setPatient, role} = useContext(CurrUserContext)
    const MedHistory = () => {
        return (
            <div className='sub-container patient-info'>
                  <h2>Medical Records</h2>
                <ConditionalRender
                    condition={Patient?.medicalHistory[0]}
                    elseComponent={
                        <p style={{ marginTop: 0 }}>No medical records</p>
                    }>
                    <MedicalHistory
                        medicalHistory={Patient?.medicalHistory[0]}
                    />
                </ConditionalRender>
            </div>
        )
    }
    return <div className='page'>
      <section className='primary-container'>

      <UploadMedicalRecords />
        <ViewUploadedRecords  Patient={Patient} setPatient={setPatient} role={role}/>
        <MedHistory medicalHistory={Patient?.MedicalHistory} />
      </section>

    </div>
}
export default HealthRecords