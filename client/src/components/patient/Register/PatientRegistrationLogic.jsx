import React, { useState, useContext } from 'react'
import { Button, Form, Input, DatePicker, Select, Steps, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import axiosApi from '../../../utils/axiosApi'
import CurrUserContext from '../../../contexts/CurrUser'
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    DollarOutlined,
    BookOutlined,
    PhoneOutlined,
    NumberOutlined,
    NodeIndexOutlined
} from '@ant-design/icons'

const { Step } = Steps
const { Option } = Select

const PatientRegistrationLogic = ({
    mode,
    setNewAccountModalOpen,
    setFamily,
    setFamilyMemberProfiles,
}) => {
    const [form] = Form.useForm()
    const [currentStep, setCurrentStep] = useState(0)
    const [msg, setMsg] = useState(null)
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const { currUser } = useContext(CurrUserContext)

    const nextStep = async () => {
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
                `/patient/check-username-taken/${username}`
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
                `/patient/check-email-taken/${email}`
            )
            return response.data.message
        } catch (error) {
            console.error('Error checking email availability:', error)
        }
    }

    const checkPhoneAvailablity = async (phone) => {
        try {
            if (phone?.length === 0) {
                return 202
            }
            const response = await axiosApi.get(
                `/patient/check-phone-taken/${phone}`
            )
            return response.data.message
        } catch (error) {
            console.error('Error checking phone availability:', error)
        }
    }

    const checkNidAvailablity = async (nid) => {
        try {
            if (nid?.length === 0) {
                return 202
            }
            const response = await axiosApi.get(
                `/patient/check-nid-taken/${nid}`
            )
            return response.data.message
        } catch (error) {
            console.error('Error checking national id availability:', error)
        }
    }

    const handleSubmit = async (values) => {
        try {
            const { family_relation, ...formDataWithoutRelation } = formData
            const response = await axiosApi.post('/patient/create-patient', {
                ...formDataWithoutRelation,
                ...values,
            })
            const data = response.data
            if (response) {
                message.success('Registration Successful')
                form.resetFields()
                if (mode === 1) {
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                } else {
                    setNewAccountModalOpen(false)
                    await axiosApi.post(
                        `/patient/add-to-family/${currUser?._id}`,
                        {
                            gender: response.data.gender,
                            email: response.data.email,
                            phoneNumber: response.data.phoneNumber,
                            relation: formData.family_relation,
                            linkingCode: response.data.linkingCode,
                        }
                    )
                    const res = await axiosApi.get(
                        `/patient/get-family/${currUser?._id}`
                    )
                    setFamily(res.data.familyMembers)
                    setFamilyMemberProfiles(res.data.familyMemberProfiles)
                }
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
                    {mode == 2 && (<Form.Item
                        name='family_relation'
                        label='Relation'
                        rules={[
                            {
                                required: true,
                                message: 'Please select your relationship!',
                            },
                        ]}>
                        <Select placeholder='Select Relationship'>
                            <Option value='Wife'>Wife</Option>
                            <Option value='Child'>Child</Option>
                            <Option value='Husband'>Husband</Option>
                        </Select>
                    </Form.Item>)}

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
                       <Input prefix={<UserOutlined/>} placeholder='Username' />
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
                        <Input.Password  prefix={<LockOutlined />}
                            placeholder='8 Characters password, minimum 1 number'/>
                    </Form.Item>
                </>
            ),
        },
        {
            title: 'Personal Info.',
            content: (
                <>
                    <Form.Item
                        name='birthdate'
                        label='Date of Birth'
                        rules={[
                            {
                                required: true,
                                message: 'Please select your date of birth!',
                            },
                            {
                                validator: (_, value) => {
                                    if (value && value.isAfter(new Date())) {
                                        return Promise.reject(
                                            'Date of birth cannot be in the future'
                                        )
                                    }
                                    return Promise.resolve()
                                },
                            },
                        ]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name='nid'
                        label='National ID'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your National ID!',
                            },
                            {
                                len: 14,
                                message: 'National ID must be 14 digits',
                            },
                            {
                                validator: async (_, value) => {
                                    if (!/^\d+$/.test(value)) {
                                        return Promise.reject(
                                            'National ID must contain numbers only'
                                        )
                                    }
                                    if (value.length === 14) {
                                        const isNidAvailable =
                                            await checkNidAvailablity(
                                                form.getFieldValue('nid')
                                            )
                                        if (isNidAvailable !== 202) {
                                            return Promise.reject(
                                                'National ID is already in use'
                                            )
                                        }
                                    }
                                    return Promise.resolve()
                                },
                            },
                        ]}>
                        <Input prefix={<NumberOutlined />}  placeholder="National Id"/>
                    </Form.Item>

                    <Form.Item
                        name='gender'
                        label='Gender'
                        rules={[
                            {
                                required: true,
                                message: 'Please select your gender!',
                            },
                        ]}>
                        <Select placeholder='Select Gender'>
                            <Option value='male'>Male</Option>
                            <Option value='female'>Female</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='phoneNumber'
                        label='Phone Number'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                            {
                                validator: async (_, value) => {
                                    const isPhoneAvailable =
                                        await checkPhoneAvailablity(
                                            form.getFieldValue('phoneNumber')
                                        )
                                    if (isPhoneAvailable !== 202) {
                                        return Promise.reject(
                                            'Phone number is already in use'
                                        )
                                    }
                                    return Promise.resolve()
                                },
                            },
                            {
                                len: 11,
                                message: 'Phone number must be 11 digits',
                            },
                            {
                                validator: async (_, value) => {
                                    if (!/^\d+$/.test(value)) {
                                        return Promise.reject(
                                            'Phone number must contain numbers only'
                                        )
                                    }
                                    return Promise.resolve()
                                },
                            },
                        ]}>
                        <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
                    </Form.Item>
                </>
            ),
        },
        {
            title: 'Emergency Contact',
            content: (
                <>
                    <Form.Item
                        name='emergencyName'
                        label='Contact Name'
                        rules={[
                            {
                                required: true,
                                message: 'Please input emergency contact name!',
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
                        name='emergencyPhoneNumber'
                        label='Contact Phone No.'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please input emergency contact phone number!',
                            },
                            {
                                len: 11,
                                message: 'Phone number must be 11 digits',
                            },
                            {
                                validator: async (_, value) => {
                                    if (!/^\d+$/.test(value)) {
                                        return Promise.reject(
                                            'Phone number must contain numbers only'
                                        )
                                    }
                                    return Promise.resolve()
                                },
                            },
                        ]}>
                        <Input prefix={<PhoneOutlined/>} placeholder="Phone Number"/>
                    </Form.Item>
                    <Form.Item
                        name='emergencyRelation'
                        label='Contact Relation'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please input emergency contact relation!',
                            },
                        ]}>
                        <Input prefix={<NodeIndexOutlined />} placeholder="Relation" />
                    </Form.Item>
                </>
            ),
        },
    ]

    return (
        <>
            {mode === 1 && (
                <h2 style={{ textAlign: 'center' }}>Patient Registration</h2>
            )}

            <Steps
                current={currentStep}
                style={{ marginBottom: '20px', marginTop: 20 }}>
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
                {mode === 1 && (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button
                            type='link'
                            onClick={() => navigate('/register-doctor')}>
                            Want to register as a Doctor?
                        </Button>
                    </div>
                )}
            </Form>
        </>
    )
}

export default PatientRegistrationLogic
