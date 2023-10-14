import { useState } from 'react'
import CurrUserContext from '../../contexts/CurrUser'
import { useContext } from 'react'
import ViewFamily from './ViewFamily'
const PatientProfile = () => {
    const { currUser: patient } = useContext(CurrUserContext)
    const [packageObject, setPackageObject] = useState(null)
    return (
        <div id='patient-profile-body' className='page'>
            <div className='primary-container'>
                <h2>Patient Profile</h2>
                <div className='patient-name'>
                    <h2>{patient?.name}</h2>
                </div>
                <div className='sub-container'>
                    <p>
                        <strong>Username:</strong> {patient?.username}
                    </p>
                    <p>
                        <strong>Email:</strong> {patient?.email}
                    </p>
                    <p>
                        <strong>Phone Number:</strong> {patient?.phoneNumber}
                    </p>
                    <p>
                        <strong>Date of Birth:</strong>{' '}
                        {new Date(patient?.birthdate).toDateString()}
                    </p>
                    <p>
                        <strong>Emergency Name:</strong>{' '}
                        {patient?.emergencyName}
                    </p>
                    <p>
                        <strong>Emergency Phone Number:</strong>{' '}
                        {patient?.emergencyPhoneNumber}
                    </p>
                    <p>
                        <strong>Subscription Package:</strong>{' '}
                        {packageObject?.name || 'No Package'}
                    </p>
                </div>
                <ViewFamily />
            </div>
        </div>
    )
}

export default PatientProfile
