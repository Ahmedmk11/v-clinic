import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './css/patientInfo.css'
import PastPrescriptions from '../../components/doctor/PatientInfo/PastPrescriptions'
import MedicalHistory from '../../components/doctor/PatientInfo/MedicalHistory'
import PatientInfoCard from '../../components/doctor/PatientInfo/PatientInfoCard'
import ConditionalRender from '../../components/reusable/ConditionalRender'
import axios from 'axios'
import AddMedicalRecord from '../../components/doctor/PatientInfo/AddMedicalRecord'
const PatientInfo = () => {
    const { id } = useParams()
    const [SelectedPatient, setSelectedPatient] = useState(null)
    const [addMedicalRecordVisible, setAddMedicalRecordVisible] =
        useState(false)
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/patient/get-patient-by-id/${id}`)
            .then((res) => setSelectedPatient(res.data))
            .catch((err) => console.log(err))
    }, [])

    const MedHistory = () => {
        return (
            <div className='sub-container patient-info'>
                <div className='flex-contianer'>
                    <h2>Medical Records</h2>
                    <button
                        className='button'
                        onClick={() => setAddMedicalRecordVisible(true)}>
                        Add Medical Records
                    </button>
                </div>
                <ConditionalRender condition={SelectedPatient?.medicalHistory[0]} elseComponent={<p style={{marginTop:0}}>No medical records</p>}>
                    <MedicalHistory
                        medicalHistory={SelectedPatient?.medicalHistory[0]}
                    />
                </ConditionalRender>
                <AddMedicalRecord
                    visible={addMedicalRecordVisible}
                    onCancel={() => setAddMedicalRecordVisible(false)}
                    medicalHistory={SelectedPatient?.medicalHistory}
                    SelectedPatient={SelectedPatient}
                    setSelectedPatient={setSelectedPatient}
                />
            </div>
        )
    }
    const PastPres = () => {
        return (
            <div className='sub-container patient-info'>
                <h2>Past Prescriptions</h2>
                <ConditionalRender
                    condition={SelectedPatient?.prescriptions?.length > 0}
                    elseComponent={<p>No past prescriptions</p>}>
                    <PastPrescriptions
                        prescriptions={SelectedPatient?.prescriptions?.sort(
                            (a, b) => new Date(b.date) - new Date(a.date)
                        )}
                    />
                </ConditionalRender>
            </div>
        )
    }

    return (
        <div className='page'>
            <div className='primary-container'>
                <h2>Selected Patient</h2>
                <div className='patient-name'>
                    <h2>
                        {SelectedPatient?.name}
                        's Information
                    </h2>
                </div>
                <PatientInfoCard SelectedPatient={SelectedPatient} />
                <MedHistory />
                <PastPres />
            </div>
        </div>
    )
}

export default PatientInfo
