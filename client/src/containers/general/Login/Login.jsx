import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import React from 'react'
import { Button, Checkbox, Form, Input, message, Space, Select } from 'antd'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
    const [patientData, setPatientData] = useState({
        username: '',
        password: '',
        remember: false,
        role: 'patient',
    })

    const onFinish = (values) => {
        axios
            .post(`http://localhost:3000/api/auth/login`, patientData, {
                withCredentials: true,
                credintials: 'include',
            })
            .then((response) => {
                console.log('Response from server:', response.data)
                navigate('/patient')
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    const onFinishFailed = (errorInfo) => {
        message.error('Invalid email or password')
    }

    return (
        <Form
            name='loginForm'
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'>
            <Form.Item
                label='Role'
                name='role'
                initialValue={patientData.role}
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
                            setPatientData({
                                ...patientData,
                                role: value,
                            })
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
                label='Username'
                name='username'
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}>
                <Input
                    onChange={(e) => {
                        setPatientData({
                            ...patientData,
                            username: e.target.value,
                        })
                    }}
                    value={patientData.username}
                    placeholder='Username'
                />
            </Form.Item>

            <Form.Item
                label='Password'
                name='password'
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}>
                <Input.Password
                    onChange={(e) => {
                        setPatientData({
                            ...patientData,
                            password: e.target.value,
                        })
                    }}
                    value={patientData.password}
                    placeholder='Password'
                />
            </Form.Item>

            <Form.Item
                name='remember'
                valuePropName='checked'
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}>
                <Checkbox
                    onChange={(e) => {
                        setPatientData({
                            ...patientData,
                            remember: e.target.checked,
                        })
                    }}>
                    Remember me
                </Checkbox>
            </Form.Item>

            <Form.Item>
                <Button
                    type='link'
                    onClick={() => {
                        navigate('/forgot-password') // implement later
                    }}>
                    Forgot password..?
                </Button>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}>
                <Button type='primary' htmlType='submit'>
                    Login
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Login
