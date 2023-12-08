import React, { useState } from 'react'
import { Button, Form, Input, DatePicker, Steps, message } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
import axiosApi from '../../utils/axiosApi'
import { LeftCircleOutlined } from '@ant-design/icons'
import logoIcn from '../../assets/icons/logo.svg'
import '../../pages/patient/css/register.css'
import Theme from '../../components/layout/Header/Theme'
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    DollarOutlined,
    BookOutlined,
} from '@ant-design/icons'

const { Step } = Steps

const LogoIcon = () => <img id='logo' style={{ width: 200 }} src={logoIcn} />

const DoctorRegistration = () => {
    const [form] = Form.useForm()
    const [currentStep, setCurrentStep] = useState(0)
    const [msg, setMsg] = useState(null)
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    const nextStep = () => {
        form.validateFields().then((values) => {
            setFormData({ ...formData, ...values }),
                setCurrentStep(currentStep + 1)
        })
    }

    const prevStep = () => {
        setCurrentStep(currentStep - 1)
    }

    const checkUsernameAvailablity = async (username) => {
        try {
            if (username?.length === 0) {
                return 202
            }
            const response = await axiosApi.get(
                `/doctor/check-username-taken/${username}`
            )
            return response.data.message
        } catch (error) {
            console.error('Error checking username availability:', error)
        }
    }

    const checkEmailAvailablity = async (email) => {
        try {
            if (email?.length === 0) {
                return 202
            }
            const response = await axiosApi.get(
                `/doctor/check-email-taken/${email}`
            )
            return response.data.message
        } catch (error) {
            console.error('Error checking email availability:', error)
        }
    }

    const handleSubmit = async (values) => {
        try {
            const response = await axiosApi.post('/doctor/create-doctor', {
                ...formData,
                ...values,
            })
            const data = response.data
            if (response) {
                message.success('Registration Successful')
                form.resetFields()
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            } else {
                setMsg(data.message)
            }
        } catch (error) {
            setMsg(error.message)
        }
    }

    const steps = [
        {
            title: 'Basic Info.',
            content: (
                <>
                    <Form.Item
                        name='username'
                        label='Username'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                            {
                                validator: async (_, value) => {
                                    const isUsernameAvailable =
                                        await checkUsernameAvailablity(
                                            form.getFieldValue('username')
                                        )
                                    if (isUsernameAvailable !== 202) {
                                        return Promise.reject(
                                            'Username is already in use'
                                        )
                                    }
                                    return Promise.resolve()
                                },
                            },
                        ]}>
                        <Input prefix={<UserOutlined/>} placeholder='Username'/>
                    </Form.Item>
                    <Form.Item
                        name='name'
                        label='Name'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                            {
                                validator: async (_, value) => {
                                    if (!/^[a-zA-Z\s]*$/.test(value)) {
                                        return Promise.reject(
                                            'Name must contain letters only'
                                        )
                                    }
                                    return Promise.resolve()
                                },
                            },
                        ]}>
                        <Input prefix={<UserOutlined/>} placeholder='Name' />
                    </Form.Item>
                    <Form.Item
                        name='email'
                        label='Email'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                                type: 'email',
                            },
                            {
                                validator: async (_, value) => {
                                    const isEmailAvailable =
                                        await checkEmailAvailablity(
                                            form.getFieldValue('email')
                                        )
                                    if (isEmailAvailable !== 202) {
                                        return Promise.reject(
                                            'Email is already in use'
                                        )
                                    }
                                    return Promise.resolve()
                                },
                            },
                        ]}>
                        <Input prefix={<MailOutlined/>} placeholder='Email'/>
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label='Password'
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                            {
                                validator: (_, value) => {
                                    if (value.length < 8) {
                                        return Promise.reject(
                                            'Password must be at least 8 characters'
                                        )
                                    }
                                    if (
                                        !/[a-zA-Z]/.test(value) ||
                                        !/\d/.test(value)
                                    ) {
                                        return Promise.reject(
                                            'Password must contain at least 1 letter and 1 number'
                                        )
                                    }
                                    return Promise.resolve()
                                },
                            },
                        ]}>
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder='8 Characters password, minimum 1 number'
                        />
                    </Form.Item>
                </>
            ),
        },
        {
            title: 'Personal Info.',
            content: (
                <>
                    <Form.Item
                        name='dob'
                        label='Date of Birth'
                        rules={[
                            {
                                required: true,
                                message: 'Please select your date of birth!',
                            },
                            {
                                validator: (_, value) => {
                                    const age =
                                        new Date().getFullYear() -
                                        new Date(value).getFullYear()
                                    if (age < 25) {
                                        return Promise.reject(
                                            'You must be at least 25 years old'
                                        )
                                    }
                                    return Promise.resolve()
                                },
                            },
                        ]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name='education'
                        label='Educational Background'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please input your educational background!',
                            },
                        ]}>
                         <Input
            prefix={<BookOutlined />}
            placeholder="Educational Background"
          />
                    </Form.Item>
                </>
            ),
        },
        {
            title: 'Work Info.',
            content: (
                <>
                    <Form.Item
                        name='hourly_rate'
                        label='Hourly Rate'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your hourly rate!',
                            },
                            {
                                validator: (_, value) => {
                                    if (value < 0) {
                                        return Promise.reject(
                                            'Hourly rate must be greater than 0'
                                        )
                                    }
                                    return Promise.resolve()
                                },
                            },
                        ]}>
                        <Input prefix={<DollarOutlined/>} placeholder='Hourly rate' />
                    </Form.Item>
                    <Form.Item
                        name='speciality'
                        label='Speciality'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your speciality!',
                            },
                        ]}>
                        <Input placeholder='Speciality' />
                    </Form.Item>
                    <Form.Item
                        name='affiliation'
                        label='Affiliation'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your affiliation!',
                            },
                        ]}>
                        <Input placeholder='Affiliation' />
                    </Form.Item>
                </>
            ),
        },
    ]

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
                <h2 style={{ textAlign: 'center' }}>Doctor Registration</h2>
                <Steps current={currentStep} style={{ marginBottom: '20px' }}>
                    {steps.map((step, index) => (
                        <Step key={index} title={step.title} />
                    ))}
                </Steps>
                <Form form={form} onFinish={handleSubmit}>
                    {steps[currentStep].content}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '10px',
                            marginTop: '20px',
                        }}>
                        {currentStep > 0 && (
                            <Button type='default' onClick={prevStep}>
                                Previous
                            </Button>
                        )}
                        {currentStep < steps.length - 1 && (
                            <Button type='primary' onClick={nextStep}>
                                Next
                            </Button>
                        )}
                        {currentStep === steps.length - 1 && (
                            <Button type='primary' htmlType='submit'>
                                Register
                            </Button>
                        )}
                    </div>
                    {msg && (
                        <p
                            style={{
                                color:
                                    msg === 'Registration Successful'
                                        ? 'green'
                                        : 'red',
                                textAlign: 'center',
                                marginTop: '20px',
                            }}>
                            {msg}
                        </p>
                    )}
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button
                            type='link'
                            onClick={() => navigate('/register')}>
                            Want to register as a Patient?
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default DoctorRegistration
