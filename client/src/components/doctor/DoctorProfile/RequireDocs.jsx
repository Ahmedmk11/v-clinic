import './requireDocs.css'
import { useNavigate } from 'react-router-dom'
import { CloseOutlined } from '@ant-design/icons'
import { useState } from 'react'
import ImageGallery from '../../reusable/ImageGallery/ImageGallery'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import { baseURL } from '../../../utils/axiosApi'
import { Button ,Alert,Space} from 'antd'
const RequireDocs = ({ docs, status,children}) => {
    const navigate = useNavigate()
    const handleUpload = () => {
        navigate('/doctor/uploadDocuments')
    }

    return (
        <>
            <ConditionalRender
                condition={
                    docs?.length < 3 &&
                    status?.toLowerCase() == 'pending'
                }>
                <div className=' doctor-reminder'>
                <Alert
                action={
        <Space>
          <Button  size="small" onClick={handleUpload}>
            Proceed
          </Button>
        </Space>
      }
                       message=' Thank you for registering with our platform. We
                       appreciate your interest in joining our community. To
                       complete your registration process, we kindly request
                       you to submit some documents down below.' 
                          type='warning'
                            showIcon
                            closable
                   />
                </div>
            </ConditionalRender>
            {children}
            <ConditionalRender
                condition={status?.toLowerCase() == 'pending'}>
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
            
        </>
    )
}
export default RequireDocs
