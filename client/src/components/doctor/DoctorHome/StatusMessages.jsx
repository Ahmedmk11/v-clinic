import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import Contract from './Contract'

const StatusMessages = ({ Doctor }) => {
    const navigate = useNavigate()
    const [contractVisible, setContractVisible] = useState(false)
    const handleUpload = () => {
        navigate('/doctor/uploadDocuments')
    }

    return (
        <>
            <ConditionalRender
                condition={
                    Doctor?.status?.toLowerCase() === 'pending' &&
                    Doctor?.uploaded_documents?.length < 1
                }>
                <div className='sub-container'>
                    <h3>
                        Thank you for registering with our platform. We
                        appreciate your interest in joining our community. To
                        complete your registration process, we kindly request
                        you to submit some documents
                    </h3>
                    <button className='button' onClick={handleUpload}>
                        Upload Documents
                    </button>
                </div>
            </ConditionalRender>
            <ConditionalRender
                condition={Doctor?.status?.toLowerCase() === 'rejected'}>
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
            </ConditionalRender>
            <ConditionalRender
                condition={
                    Doctor?.status?.toLowerCase() === 'active' &&
                    Doctor?.contract_acceptance?.toLowerCase() == 'pending'
                }>
                <div className='sub-container'>
                    <h3>
                        Your registration request has been accepted. Review your
                        employment contract and sign it to start using the
                        platform.
                    </h3>
                    <button
                        className='button'
                        onClick={() => setContractVisible(true)}>
                        View Contract
                    </button>
                </div>
                <Contract
                    visible={contractVisible}
                    name={Doctor?.name}
                    onCancel={() => {
                        setContractVisible(false)
                    }}
                />
            </ConditionalRender>
        </>
    )
}
export default StatusMessages
