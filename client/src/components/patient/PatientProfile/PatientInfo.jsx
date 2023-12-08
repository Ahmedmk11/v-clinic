import { useState } from 'react'
import ChangePassword from './ChangePassword'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button } from 'antd'
const PatientInfo = ({ patient }) => {
    const [open, setOpen] = useState(false)
    const [showLinkingCode, setShowLinkingCode] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleToggle = () => {
        setShowLinkingCode(!showLinkingCode)
    }

    const handleCopy = () => {
        setTimeout(() => {
            setCopied(false)
        }, 2000)
        setCopied(true)
    }
    return (
        <>
            <div className='patient-name'>
                <h2
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                    {patient?.name}
                    <Button onClick={handleToggle}>
                        {showLinkingCode
                            ? 'Hide Linking Code'
                            : 'Show Linking Code'}
                    </Button>
                </h2>
                <div>
                    {showLinkingCode && (
                        <div
                            style={{
                                fontSize: '0.8rem',
                            }}>
                            <p>Your Linking Code:</p>
                            <div>
                                <span
                                    style={{
                                        backgroundColor: '#eee',
                                        padding: '0.5rem',
                                        marginRight: '0.5rem',
                                        borderRadius: '0.5rem',
                                        color: '#000',
                                    }}>
                                    {patient?.linkingCode}
                                </span>
                                <CopyToClipboard
                                    text={patient?.linkingCode}
                                    onCopy={handleCopy}>
                                    <Button>
                                        {copied
                                            ? 'Copied!'
                                            : 'Copy to Clipboard'}
                                    </Button>
                                </CopyToClipboard>
                            </div>
                            <p>
                                <strong>
                                    Only share this code with relatives you want
                                    to add to your account.
                                </strong>
                            </p>
                        </div>
                    )}
                </div>
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
                    <Button type='primary' onClick={() => setOpen(true)}>
                        Change Password
                    </Button>
                    <ChangePassword open={open} setOpen={setOpen} />
                </div>
            </div>
        </>
    )
}
export default PatientInfo
