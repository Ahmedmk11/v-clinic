import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { LeftCircleOutlined } from '@ant-design/icons'
import PatientRegistrationLogic from '../../components/patient/Register/PatientRegistrationLogic'

const PatientRegistration = () => {
    return (
        <div
            style={{
                width: '600px',
                margin: 'auto',
                padding: '2%',
                border: '1px solid #ccc',
                borderRadius: '8px',
            }}>
            <Link to='/login'>
                <Button
                    icon={<LeftCircleOutlined />}
                    size='small'
                    type='primary'>
                    Back to Login
                </Button>
            </Link>
            <PatientRegistrationLogic mode={1} setNewAccountModalOpen={null} />
        </div>
    )
}

export default PatientRegistration
