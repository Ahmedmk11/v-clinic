import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import React from 'react'
import {
    Button,
    Checkbox,
    Form,
    Input,
    message,
    Space,
    Select,
    Modal,
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import axiosApi from '../../../utils/axiosApi'
import ConditionalRender from '../../../components/reusable/ConditionalRender/ConditionalRender'
import logoIcn from '../../../assets/icons/logo.svg'
import './Login.css'
import Theme from '../../../components/layout/Header/Theme'

const LogoIcon = () => <img id='logo' style={{ width: 200 }} src={logoIcn} />

const Login = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        remember: true,
        role: 'patient',
    })
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const onFinish = (values) => {
        setLoading(true)
        axiosApi
            .post(`/auth/login`, userData, {
                withCredentials: true,
                credintials: 'include',
            })
            .then((response) => {
                message.success('Logged in successfully')
                navigate(`/${userData.role}`)
            })
            .catch((error) => {
                console.error('Error:', error)
                message.error('Invalid username or password')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const onFinishFailed = (errorInfo) => {
        message.error('Invalid email or password')
    }

    return (
        <div id='login'>
            <Theme />
            <Button
                type='link'
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    margin: '1rem',
                }}
                onClick={() => setIsOpen(true)}>
                Testing Info
            </Button>
            <div id='left'>
                <LogoIcon />
            </div>
            <div id='right'>
                <Space wrap>
                    <h2 className='login-text'>
                        Login as a{userData.role == 'admin' && 'n'}
                    </h2>
                    <Select
                        allowClear
                        defaultValue='patient'
                        size='middle'
                        style={{ width: 110 }}
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
                <Form
                    name='loginForm'
                    style={{
                        width: '40%',
                    }}
                    size='large'
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'>
                    <Form.Item
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}>
                        <Input
                            prefix={<UserOutlined />}
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
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}>
                        <Input.Password
                            prefix={<LockOutlined />}
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
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <Form.Item name='remember' valuePropName='checked'>
                            <Checkbox
                                checked={userData.remember}
                                onChange={(e) => {
                                    setUserData({
                                        ...userData,
                                        remember: e.target.checked,
                                    })
                                }}></Checkbox>
                            <span className='login-text r'>Remember me</span>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type='link'
                                onClick={() => {
                                    navigate('/forgot-password')
                                }}>
                                Forgot password?
                            </Button>
                        </Form.Item>
                    </div>

                    <Form.Item
                        style={{
                            marginBottom: 0,
                        }}>
                        <Button
                            block
                            type='primary'
                            htmlType='submit'
                            loading={loading}>
                            Log in
                        </Button>
                    </Form.Item>
                    <ConditionalRender condition={userData.role != 'admin'}>
                        <Form.Item
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                            <p
                                className='login-text'
                                style={{ marginRight: 0 }}>
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
                    </ConditionalRender>
                </Form>
                <Modal
                    open={isOpen}
                    footer={null}
                    title='Testing Info'
                    onCancel={() => {
                        setIsOpen(false)
                    }}
                    destroyOnClose>
                    <div style={{ textAlign: 'center' }}>
                        <span>Admin: admin, admin1234</span>
                        <br />
                        <span>
                            Patient account with family: saleh, saleh1234
                        </span>
                        <br />
                        <span>Family member: karma, karma1234</span>
                        <br />
                        <span>
                            Patient account without family: ahmed, ahmed1234
                        </span>
                        <br />
                        <span>
                            Active doctor account: iamasurgeon, ahmed123
                        </span>
                        <br />
                        <span>Inactive doctor account: belly, belly1234</span>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Login
