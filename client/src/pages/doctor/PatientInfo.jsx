import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './css/patientInfo.css'
import PastPrescriptions from '../../components/doctor/PatientInfo/PastPrescriptions'
import MedicalHistory from '../../components/doctor/PatientInfo/MedicalHistory'
import PatientInfoCard from '../../components/doctor/PatientInfo/PatientInfoCard'
import ConditionalRender from '../../components/reusable/ConditionalRender/ConditionalRender'
import axios from 'axios'
const PatientInfo = () => {
    const { id } = useParams()
    const [SelectedPatient, setSelectedPatient] = useState(null)

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/patient/get-patient-by-id/${id}`)
            .then((res) => setSelectedPatient(res.data))
            .catch((err) => console.log(err))
    }, [id])

    const MedHistory = () => {
        return (
            <div className='sub-container patient-info'>
                <h2>Medical History</h2>
                <ConditionalRender
                    condition={SelectedPatient?.medicalHistory?.length > 0}
                    elseComponent={<p>No medical history</p>}>
                    <MedicalHistory
                        medicalHistory={SelectedPatient?.medicalHistory[0]}
                    />
                </ConditionalRender>
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
