import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import Contract from './Contract'
import { Button, Alert, Divider } from 'antd'

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
                <Alert
                    message={
                        <h3 style={{ marginBottom: 0 }}>
                            Welcome to Virtual Clinic!
                        </h3>
                    }
                    description='Thank you for registering with our platform. We appreciate your interest in joining our community. To complete your registration process, we kindly request you to submit some documents'
                    type='info'
                    style={{ display: 'flex', alignItems: 'center' }}
                    action={
                        <Button type='primary' onClick={handleUpload}>
                            Upload Documents
                        </Button>
                    }
                />
                <Divider />
            </ConditionalRender>
            <ConditionalRender
                condition={Doctor?.status?.toLowerCase() === 'rejected'}>
                <Alert
                    message={
                        <h3 style={{ marginBottom: 0 }}>Sad to see you go!</h3>
                    }
                    type='error'
                    description={
                        <p>
                            Your registration request has been rejected. If you
                            think this is a mistake, please contact us at{' '}
                            <a href='mailto: virtualclinicmail@gmail.com'>
                                virtualclinicmail@gmail.com
                            </a>
                            .
                        </p>
                    }></Alert>
                    <Divider />
            </ConditionalRender>
            <ConditionalRender
                condition={
                    Doctor?.status?.toLowerCase() === 'active' &&
                    Doctor?.contract_acceptance?.toLowerCase() == 'pending'
                }>
                <Alert
                    message={<h3 style={{ marginBottom: 0 }}>Congrats!</h3>}
                    type='success'
                    description=' Your registration request has been accepted. Review your
                    employment contract and sign it to start using the
                    platform.'
                    style={{ display: 'flex', alignItems: 'center' }}
                    action={
                        <Button onClick={() => setContractVisible(true)}>
                            View Contract
                        </Button>
                    }
                />

                <Contract
                    visible={contractVisible}
                    name={Doctor?.name}
                    onCancel={() => {
                        setContractVisible(false)
                    }}
                />
                <Divider />
            </ConditionalRender>
        </>
    )
}
export default StatusMessages
