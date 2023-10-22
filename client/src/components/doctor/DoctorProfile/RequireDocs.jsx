import './requireDocs.css'
import { useNavigate } from 'react-router-dom'
import { CloseOutlined } from '@ant-design/icons'
import { useState } from 'react'
import ImageGallery from '../../reusable/ImageGallery/ImageGallery'
const RequireDocs = ({ docs,status,uploaded_documents }) => {
    const [show, setShow] = useState(true)
    const navigate = useNavigate()
    const handleUpload = () => {
        navigate('/doctor/uploadDocuments')
    }

    return (
        <>
            {docs?.length < 1 && show && (
            <div className='sub-container doctor-reminder'>
                <div
                    className='close'
                    onClick={() => {
                        setShow(false)
                    }}>
                    <CloseOutlined />
                </div>
                <p>
                    Thank you for registering with our platform. We appreciate
                    your interest in joining our community. To complete your
                    registration process, we kindly request you to submit the
                    some documents
                </p>
            </div>
            )}
           { status?.toLowerCase()=="pending" && <div className='sub-container'>
                <h2>Documents Upload</h2>
                <p>
                    Complete your registration process by uploading the required documents to activate your account.
                </p>
                <button className='button' onClick={handleUpload}>
                    Upload Documents
                </button>
              </div>}

              {status?.toLowerCase()=="active" && <div className='sub-container'>
               <h2>Uploaded Documents</h2>
               <ImageGallery
                            images={uploaded_documents?.map(
                                (url) => 'http://localhost:3000/api/' + url
                            )}
                        />
                </div>
                }
        </>
    )
}
export default RequireDocs
