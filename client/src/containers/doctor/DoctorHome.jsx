import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CurrUserContext from '../../contexts/CurrUser'

const DoctorHome = () => {
    const { currUser: Doctor } = useContext(CurrUserContext)
    const navigate = useNavigate()
    const handleUpload = () => {
        navigate('/doctor/uploadDocuments')
    }

    return (
        <div className='page'>
            {Doctor?.status?.toLowerCase() === 'pending' &&
                Doctor?.uploaded_documents?.length < 1 && (
                    <div className='sub-container'>
                        <h3>
                            Thank you for registering with our platform. We
                            appreciate your interest in joining our community.
                            To complete your registration process, we kindly
                            request you to submit some documents
                        </h3>
                        <button className='button' onClick={handleUpload}>
                            Upload Documents
                        </button>
                    </div>
                )}
            {Doctor?.status?.toLowerCase() === 'rejected' && (
                <div className='sub-container'>
                    <h3>
                        Your registration request has been rejected. If you
                        think this is a mistake, please contact us at{' '}
                        <a href='mailto: V-Clinic@gmail.com'>
                            V-Clinic@gmail.com
                        </a>
                        .
                    </h3>
                </div>
            )}
        </div>
    )
}

export default DoctorHome
