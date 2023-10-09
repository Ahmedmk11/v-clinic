import { useEffect, useState, useContext } from 'react'
import './patientInfo.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DoctorContext from '../../context/Doctor'
import  calcAge  from '../../utils/calcAge'

const PatientInfo = () => {
    const { SelectedPatient } = useContext(DoctorContext)
    const [downloadMessage, setDownloadMessage] = useState('')
    const [buttonClicked, setButtonClicked] = useState(false)
    const { id } = useParams()

    const axiosDownloadFile = (fileName) => {
        setDownloadMessage('')
        setButtonClicked(true)
        axios({
            url: SelectedPatient.healthRecords,
            method: 'GET',
            responseType: 'blob',
        })
            .then((response) => {
                const href = window.URL.createObjectURL(response.data)

                const anchorElement = document.createElement('a')

                anchorElement.href = href
                anchorElement.download = fileName

                document.body.appendChild(anchorElement)
                anchorElement.click()

                setDownloadMessage('success')

                document.body.removeChild(anchorElement)
                window.URL.revokeObjectURL(href)
            })
            .catch((error) => {
                console.log('error: ', error)
                setDownloadMessage('failed')
            })
            .finally(() => {
                setTimeout(() => {
                    setDownloadMessage('')
                }, 4000)
                setButtonClicked(false)
            })
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
                            ? new Date(SelectedPatient.lastVisit).toLocaleString()
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
                <div className={`message ${downloadMessage}`}>
                    {downloadMessage === 'success'
                        ? `${SelectedPatient.name} file downloaded successfully!`
                        : downloadMessage === 'failed' &&
                          !SelectedPatient.healthRecords
                        ? 'Patient has not uploaded any health records!'
                        : 'File download failed. Please try again later.'}
                </div>
                <button
                    className='button download-button'
                    disabled={buttonClicked}
                    onClick={() => {
                        axiosDownloadFile(
                            `${SelectedPatient.name}'s health records`
                        )
                    }}>
                    Download Health Records
                </button>
            </>
        )
    }

    return (
        <div className='patient-info-container'>
            <h2>Selected Patient</h2>
            <div className='patient-name'>
                <h2>
                    {SelectedPatient.name}
                    {"'s Information"}
                </h2>
            </div>
            <div className='patient-info'>{getPatientInfo()}</div>
        </div>
    )
}

export default PatientInfo
