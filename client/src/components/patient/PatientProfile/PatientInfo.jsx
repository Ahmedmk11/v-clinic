import { useState } from 'react'
import ChangePassword from './ChangePassword'
const PatientInfo = ({ patient }) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            {' '}
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
                    <strong>Emergency Name:</strong> {patient?.emergencyName}
                </p>
                <p>
                    <strong>Emergency Phone Number:</strong>{' '}
                    {patient?.emergencyPhoneNumber}
                </p>
                <div className='edit-buttons'>
                    <button className='button' onClick={() => setOpen(true)}>
                        Change Password
                    </button>
                    <ChangePassword open={open} setOpen={setOpen} />
                </div>
            </div>
        </>
    )
}
export default PatientInfo
