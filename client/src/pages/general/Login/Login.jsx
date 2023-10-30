import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import React from 'react'
import { Button, Checkbox, Form, Input, message, Space, Select } from 'antd'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        remember: true,
        role: 'patient',
    })

    const onFinish = (values) => {
        axios
            .post(`http://localhost:3000/api/auth/login`, userData, {
                withCredentials: true,
                credintials: 'include',
            })
            .then((response) => {
                console.log('Response from server:', response.data)
                message.success('Logged in successfully')
                navigate(`/${userData.role}`)
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
                initialValue={userData.role}
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
                            setUserData({
                                ...userData,
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
                        setUserData({
                            ...userData,
                            username: e.target.value,
                        })
                    }}
                    value={userData.username}
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
                        setUserData({
                            ...userData,
                            password: e.target.value,
                        })
                    }}
                    value={userData.password}
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
                        setUserData({
                            ...userData,
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
                        navigate('/forgot-password')
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

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}>
                <p style={{ marginRight: 0 }}>
                    Dont have an account?
                    <Button
                        type='link'
                        onClick={() => {
                            navigate('/register')
                        }}>
                        Register
                    </Button>
                </p>
            </Form.Item>
        </Form>
    )
}

export default Login
