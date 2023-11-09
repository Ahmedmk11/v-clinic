import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import React from 'react'
import { Button, Checkbox, Form, Input, message, Space, Select } from 'antd'
import axiosApi from '../../../utils/axiosApi'

const Login = () => {
    const navigate = useNavigate()
    const formRef = useRef(null)

    const [role, setRole] = useState('patient')
    const [newPassword, setNewPassword] = useState('')
    const [stage, setStage] = useState(1)
    const [secret, setSecret] = useState('')

    const [email, setEmail] = useState()
    const [otp, setOTP] = useState('')

    const onFinish = async () => {
        try {
            if (formRef.current) {
                await formRef.current.validateFields()

                await axiosApi.put(
                    `/auth/change-password`,
                    {
                        email: email,
                        role: role,
                        oldPassword: 'rem',
                        newPassword,
                    },
                    {
                        withCredentials: true,
                    }
                )
                console.log('Form submitted')
                message.success('Password changed successfully!')
                navigate('/')
            }
        } catch (error) {
            console.error('Form submission error:', error)
        }
    }

    const onEmailFinish = async () => {
        axiosApi
            .post(
                `/auth/generate-send-otp`,
                { email },
                {
                    withCredentials: true,
                    credintials: 'include',
                }
            )
            .then((response) => {
                console.log('Response from server:', response.data)
                setStage(2)
                setSecret(response.data.secret)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    const onOTPFinish = async () => {
        axiosApi
            .post(
                `/auth/validate-otp`,
                { otp, secret },
                {
                    withCredentials: true,
                    credintials: 'include',
                }
            )
            .then((response) => {
                console.log('Response from server:', response.data)
                setStage(3)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    return (
        <Form
            ref={formRef}
            name='password-change-form'
            onFinish={
                stage === 1
                    ? onEmailFinish
                    : stage === 2
                    ? onOTPFinish
                    : onFinish
            }
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}>
            {stage === 1 && (
                <>
                    <Form.Item label='Email' name='email'>
                        <Input
                            value={email}
                            placeholder='Enter your registered Email'
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType='submit'>
                            Send OTP
                        </Button>
                    </Form.Item>
                </>
            )}

            {stage === 2 && (
                <>
                    <Form.Item label='OTP' name='otp'>
                        <Input
                            value={otp}
                            placeholder='OTP'
                            onChange={(e) => {
                                setOTP(e.target.value)
                            }}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            onClick={() => {
                                setStage(1)
                            }}>
                            Back
                        </Button>
                        <Button type='primary' htmlType='submit'>
                            Next
                        </Button>
                    </Form.Item>
                </>
            )}

            {stage === 3 && (
                <>
                    <Form.Item
                        label='Role'
                        name='role'
                        initialValue={role}
                        rules={[
                            {
                                required: true,
                                message: 'Please select your role!',
                            },
                        ]}>
                        <Space wrap>
                            <Select
                                allowClear
                                defaultValue='patient'
                                style={{
                                    width: 120,
                                }}
                                onChange={(value) => {
                                    setRole(value)
                                }}
                                options={[
                                    {
                                        value: 'patient',
                                        label: 'Patient',
                                    },
                                    {
                                        value: 'doctor',
                                        label: 'Doctor',
                                    },
                                    {
                                        value: 'admin',
                                        label: 'Admin',
                                    },
                                ]}
                            />
                        </Space>
                    </Form.Item>
                    <Form.Item
                        label='New Password'
                        name='newPassword'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your new password!',
                            },
                        ]}>
                        <Input.Password
                            value={newPassword}
                            placeholder='New Password'
                            onChange={(e) => {
                                setNewPassword(e.target.value)
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Confirm New Password'
                        name='confirmPassword'
                        dependencies={['newPassword']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your new password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('newPassword') === value
                                    ) {
                                        // eslint-disable-next-line no-undef
                                        return Promise.resolve()
                                    }
                                    // eslint-disable-next-line no-undef
                                    return Promise.reject(
                                        'The two passwords do not match!'
                                    )
                                },
                            }),
                        ]}>
                        <Input.Password placeholder='Confirm New Password' />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType='submit'>
                            Save
                        </Button>
                        <Button
                            danger
                            onClick={() => {
                                navigate('/')
                            }}>
                            Cancel
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form>
    )
}

export default Login
