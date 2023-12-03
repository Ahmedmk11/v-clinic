import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import React from 'react'
import { Button, Checkbox, Form, Input, message, Space, Select } from 'antd'
import axiosApi from '../../../utils/axiosApi'
import './forgotPassword.css'
import logoIcn from '../../../assets/icons/logo.svg'
import Theme from '../../../components/layout/Header/Theme'

const LogoIcon = () => <img id='logo' style={{ width: 200 }} src={logoIcn} />

const ForgotPassword = () => {
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
                setStage(3)
            })
            .catch((error) => {
                message.error('Invalid OTP')
            })
    }

    return (
        <div class='registration'>
            <Theme />
            <div class='left-register'>
                <LogoIcon />
            </div>
            <div
                class='right-register'
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Space wrap>
                    <h2>Reset Password</h2>
                </Space>
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
                    style={{
                        width: '100%',
                    }}
                    size='large'>
                    {stage === 1 && (
                        <>
                            <Form.Item
                                label='Email'
                                name='email'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Input
                                    value={email}
                                    placeholder='Enter your registered Email'
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}>
                                <Space
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        gap: '1rem',
                                    }}>
                                    <Button
                                        onClick={() => {
                                            navigate('/')
                                        }}>
                                        Back to Login
                                    </Button>
                                    <Button type='primary' htmlType='submit'>
                                        Send OTP
                                    </Button>
                                </Space>
                            </Form.Item>
                        </>
                    )}

                    {stage === 2 && (
                        <>
                            <Form.Item
                                label='OTP'
                                name='otp'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Input
                                    value={otp}
                                    placeholder='OTP'
                                    onChange={(e) => {
                                        setOTP(e.target.value)
                                    }}
                                />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Space
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        gap: '1rem',
                                    }}>
                                    <Button
                                        onClick={() => {
                                            setStage(1)
                                        }}>
                                        Back
                                    </Button>
                                    <Button type='primary' htmlType='submit'>
                                        Next
                                    </Button>
                                </Space>
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
                                        message:
                                            'Please enter your new password!',
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
                                        message:
                                            'Please confirm your new password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue('newPassword') ===
                                                    value
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
                                <Space
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        gap: '1rem',
                                    }}>
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
                                </Space>
                            </Form.Item>
                        </>
                    )}
                </Form>
            </div>
        </div>
    )
}

export default ForgotPassword
