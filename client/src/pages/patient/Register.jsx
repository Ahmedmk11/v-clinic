import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { LeftCircleOutlined } from '@ant-design/icons'
import PatientRegistrationLogic from '../../components/patient/Register/PatientRegistrationLogic'
import logoIcn from '../../assets/icons/logo.svg'
import './css/register.css'
import Theme from '../../components/layout/Header/Theme'

const LogoIcon = () => <img id='logo' style={{ width: 200 }} src={logoIcn} />

const PatientRegistration = () => {
    return (
        <div className='registration'>
            <Theme />
            <div className='left-register'>
                <LogoIcon />
            </div>
            <div className='right-register'>
                <Link to='/login'>
                    <Button icon={<LeftCircleOutlined />} type='primary'>
                        Back to Login
                    </Button>
                </Link>
                <PatientRegistrationLogic
                    mode={1}
                    setNewAccountModalOpen={null}
                />
            </div>
        </div>
    )
}

export default PatientRegistration
