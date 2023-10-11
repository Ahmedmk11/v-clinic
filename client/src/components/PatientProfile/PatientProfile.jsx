import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import FamilyMembers from '../FamilyMembers/FamilyMembers'

import './patientProfile.css'

const PatientProfile = () => {
    const [patient, setPatient] = useState(null)
    const [packageObject, setPackageObject] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/patient/get-patient-by-id/${id}`)
            .then((res) => {
                setPatient(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [id])

    return (
        <div id='patient-profile-body'>
            <h1>Patient Profile</h1>
            <div className='patient-profile'>
                <div className='patient-profile-info'>
                    <div className='patient-profile-info-item'>
                        <p className='patient-profile-info-item-title'>Name:</p>
                        <p className='patient-profile-info-item-value'>
                            {patient?.name}
                        </p>
                    </div>
                    <div className='patient-profile-info-item'>
                        <p className='patient-profile-info-item-title'>
                            Username:
                        </p>
                        <p className='patient-profile-info-item-value'>
                            {patient?.username}
                        </p>
                    </div>
                    <div className='patient-profile-info-item'>
                        <p className='patient-profile-info-item-title'>
                            Email:
                        </p>
                        <p className='patient-profile-info-item-value'>
                            {patient?.email}
                        </p>
                    </div>
                    <div className='patient-profile-info-item'>
                        <p className='patient-profile-info-item-title'>
                            Phone Number:
                        </p>
                        <p className='patient-profile-info-item-value'>
                            {patient?.phoneNumber}
                        </p>
                    </div>
                    <div className='patient-profile-info-item'>
                        <p className='patient-profile-info-item-title'>
                            Date of Birth:
                        </p>
                        <p className='patient-profile-info-item-value'>
                            {patient?.birthdate}
                        </p>
                    </div>
                    <div className='patient-profile-info-item'>
                        <p className='patient-profile-info-item-title'>
                            Emergency Name:
                        </p>
                        <p className='patient-profile-info-item-value'>
                            {patient?.emergencyName}
                        </p>
                    </div>
                    <div className='patient-profile-info-item'>
                        <p className='patient-profile-info-item-title'>
                            Emergency Phone Number:
                        </p>
                        <p className='patient-profile-info-item-value'>
                            {patient?.emergencyPhoneNumber}
                        </p>
                    </div>
                    <div className='patient-profile-info-item'>
                        <p className='patient-profile-info-item-title'>
                            Subscription Package:
                        </p>
                        <p className='patient-profile-info-item-value'>
                            {packageObject?.name || 'No Package'}
                        </p>
                    </div>
                </div>
            </div>
            <FamilyMembers id={id} />
        </div>
    )
}

export default PatientProfile
