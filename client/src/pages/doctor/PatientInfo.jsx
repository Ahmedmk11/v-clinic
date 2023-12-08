import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import './css/patientInfo.css'
import PastPrescriptions from '../../components/doctor/PatientInfo/PastPrescriptions'
import MedicalHistory from '../../components/doctor/PatientInfo/MedicalHistory'
import PatientInfoCard from '../../components/doctor/PatientInfo/PatientInfoCard'
import ConditionalRender from '../../components/reusable/ConditionalRender/ConditionalRender'
import AddMedicalRecord from '../../components/doctor/PatientInfo/AddMedicalRecord'
import CreateFollowUp from '../../components/doctor/PatientInfo/CreateFollowUp'
import CurrUserContext from '../../contexts/CurrUser'
import { message,Button } from 'antd'
import ViewUploadedRecords from '../../components/patient/HealthRecords/ViewUploadedRecords'
import axiosApi from '../../utils/axiosApi'
const PatientInfo = () => {
    const { id } = useParams()
    const [SelectedPatient, setSelectedPatient] = useState(null)
    const [addMedicalRecordVisible, setAddMedicalRecordVisible] =
        useState(false)
    const [followUpVisible, setFollowUpVisible] = useState(false)
    const { currUser: Doctor } = useContext(CurrUserContext)
    useEffect(() => {
        axiosApi
            .get(`/doctor/get-patient/${Doctor?._id}/${id}`)
            .then((res) => setSelectedPatient(res.data))
            .catch((err) => console.log(err))
    }, [])

    const MedHistory = () => {
        return (
            <div className='sub-container patient-info'>
                <div className='flex-contianer'>
                    <h2>Medical Records</h2>
                    <Button type='primary'
                        onClick={() => setAddMedicalRecordVisible(true)}>
                        Add Medical Records
                    </Button>
                </div>
                <ConditionalRender
                    condition={SelectedPatient?.medicalHistory[0]}
                    elseComponent={
                        <p style={{ marginTop: 0 }}>No medical records</p>
                    }>
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
    const handleCreateFollowUp = (values) => {
        axiosApi
            .post('/patient/add-appointment', {
                ...values,
                patient_id: id,
                doctor_id: Doctor._id,
            })
            .then((res) => {
                if (res.data) {
                    message.success('Follow up scheduled successfully!')
                    setFollowUpVisible(false)
                }
            })
            .catch((err) => {
                console.log(err)
                message.error('Failed to schedule follow up')
            })
    }
    return (
        <div className='page'>
            <div className='primary-container'>
                <h2>Selected Patient</h2>
                <div className='patient-name followup'>
                    <h2>
                        {SelectedPatient?.name}
                        's Information
                    </h2>
                    <Button type='primary'
                        onClick={() => setFollowUpVisible(true)}>
                        Schedule Follow Up
                    </Button>
                    <CreateFollowUp
                        visible={followUpVisible}
                        onCreate={handleCreateFollowUp}
                        onCancel={() => setFollowUpVisible(false)}
                    />
                </div>
                <PatientInfoCard SelectedPatient={SelectedPatient} id={Doctor?._id} />
                <MedHistory />
                <ViewUploadedRecords  Patient={SelectedPatient}/>
                <PastPres />
            </div>
        </div>
    )
}

export default PatientInfo
