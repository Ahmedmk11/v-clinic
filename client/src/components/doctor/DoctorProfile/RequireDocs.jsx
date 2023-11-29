import './requireDocs.css'
import { useNavigate } from 'react-router-dom'
import { CloseOutlined } from '@ant-design/icons'
import { useState } from 'react'
import ImageGallery from '../../reusable/ImageGallery/ImageGallery'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import { baseURL } from '../../../utils/axiosApi'
import { Button } from 'antd'
const RequireDocs = ({ docs, status, uploaded_documents }) => {
    const [show, setShow] = useState(true)
    const navigate = useNavigate()
    const handleUpload = () => {
        navigate('/doctor/uploadDocuments')
    }

    return (
        <>
            <ConditionalRender
                condition={
                    docs?.length < 3 &&
                    status?.toLowerCase() == 'pending' &&
                    show
                }>
                <div className='sub-container doctor-reminder'>
                    <div
                        className='close'
                        onClick={() => {
                            setShow(false)
                        }}>
                        <CloseOutlined />
                    </div>
                    <p>
                        Thank you for registering with our platform. We
                        appreciate your interest in joining our community. To
                        complete your registration process, we kindly request
                        you to submit some documents
                    </p>
                </div>
            </ConditionalRender>
            <ConditionalRender
                condition={status?.toLowerCase() == 'pending' && show}>
                <div className='sub-container'>
                    <h2>Documents Upload</h2>
                    <p>
                        Complete your registration process by uploading the
                        required documents to activate your account.
                    </p>
                    <Button type='primary' onClick={handleUpload}>
                        Upload Documents
                    </Button>
                </div>
            </ConditionalRender>
            <ConditionalRender condition={status?.toLowerCase() == 'active'}>
                <div className='sub-container'>
                    <h2>Uploaded Documents</h2>
                    <ImageGallery
                        images={uploaded_documents?.map(
                            (url) => baseURL + url
                        )}
                    />
                </div>
            </ConditionalRender>
        </>
    )
}
export default RequireDocs
