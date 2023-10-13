import { useEffect, useState, useContext } from 'react'
import './css/patientInfo.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import calcAge from '../../utils/calcAge'
import PdfViewer from '../../components/reusable/PdfViewer/PdfViewer'
import PastPrescriptions from '../../components/doctor/PatientInfo/PastPrescriptions'
import MedicalHistory from '../../components/doctor/PatientInfo/MedicalHistory'
import SelectedPatientContext from '../../contexts/SelectedPatient'

const PatientInfo = () => {
    const { SelectedPatient } =useContext(SelectedPatientContext)
    const [buttonClicked, setButtonClicked] = useState(false)
    const [displayPdf, setDisplayPdf] = useState('none')
    const { id } = useParams()
    console.log(SelectedPatient)
    const viewHealthRecords = () => {
        setButtonClicked(true)
        setDisplayPdf('block')
    }
    const handleClose = () => {
        setButtonClicked(false)
        setDisplayPdf('none')
    }

    const getPatientInfo = () => {
        return (
            <>
                <ul>
                    <li>
                        <strong>Age: </strong>{' '}
                        {calcAge(SelectedPatient.birthdate)}
                    </li>
                    <li>
                        <strong>Gender: </strong> {SelectedPatient.gender}
                    </li>
                    <li>
                        <strong>Phone Number: </strong>
                        <a href={`tel:${SelectedPatient.phoneNumber}`}>
                            {SelectedPatient.phoneNumber}
                        </a>
                    </li>
                    <li>
                        <strong>Email: </strong>{' '}
                        <a href={`mailto:${SelectedPatient.email}`}>
                            {SelectedPatient.email}
                        </a>
                    </li>
                    <li>
                        <strong>Last Visit: </strong>{' '}
                        {SelectedPatient.lastVisit
                            ? new Date(
                                  SelectedPatient.lastVisit
                              ).toLocaleString()
                            : 'No previous visits'}
                    </li>
                    <li>
                        <strong>Next Appointment: </strong>{' '}
                        {SelectedPatient.nextAppointment
                            ? new Date(
                                  SelectedPatient.nextAppointment
                              ).toLocaleString()
                            : 'No upcoming appointments'}
                    </li>
                    <li>
                        <strong>Emergency Contact: </strong>{' '}
                        {`${SelectedPatient.emergencyName},`}{' '}
                        <a href={`tel:${SelectedPatient.emergencyPhoneNumber}`}>
                            {SelectedPatient.emergencyPhoneNumber}
                        </a>
                    </li>
                </ul>
                {/* <div className='edit-buttons'>
                    <button
                        className='button '
                        disabled={buttonClicked}
                        onClick={viewHealthRecords}>
                        View Health Records
                    </button>
                    <button
                        style={{ display: displayPdf }}
                        className='button cancel-button'
                        onClick={handleClose}>
                        Close
                    </button>
                </div> */}
            </>
        )
    }

    return (
        <div className='page'>
        <div className='primary-container'>
            <h2>Selected Patient</h2>
            <div className='patient-name'>
                <h2>
                    {SelectedPatient.name}
                    {"'s Information"}
                </h2>
            </div>
            <div className='sub-container patient-info'>
                <h2>General Info</h2>
                {getPatientInfo()}
                {/* <div
                    className='patient-pdf-viewer'
                    style={{ display: displayPdf }}>
                    <PdfViewer pdfUrl={SelectedPatient.health_records}/>
                </div> */}
            </div>
            <div className='sub-container patient-info'>
                {SelectedPatient?.medicalHistory?.length > 0 ? (
                    <MedicalHistory
                    medicalHistory={SelectedPatient.medicalHistory[0]}
                    />
                    ) : (
                        <p>No medical history</p>
                        )}
            </div>
            <div className='sub-container patient-info'>
                <h2>Past Prescriptions</h2>
                {SelectedPatient?.prescriptions?.length > 0 ? (
                    <PastPrescriptions
                    prescriptions={SelectedPatient.prescriptions.sort(
                        (a, b) => new Date(b.date) - new Date(a.date)
                        )}
                        />
                        ) : (
                            <p>No past prescriptions</p>
                            )}
            </div>
        </div>
                            </div>
    )
}

export default PatientInfo
