import './header.css'
import { React, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Avatar, Dropdown, Space, message } from 'antd'
import moonIcn from '../../../assets/icons/moon.svg'
import sunIcn from '../../../assets/icons/sun.svg'
import chatIcn from '../../../assets/icons/chat.svg'
import inboxIcn from '../../../assets/icons/inbox.svg'
import readIcn from '../../../assets/icons/read.svg'
import logoIcn from '../../../assets/icons/logo.svg'
import { UserOutlined, WalletOutlined, LogoutOutlined } from '@ant-design/icons'
import CurrUser from '../../../contexts/CurrUser'
import CurrTheme from '../../../contexts/CurrTheme'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import axiosApi from '../../../utils/axiosApi'
import { FloatButton } from 'antd'

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode')
} else {
    document.body.classList.add('light-mode')
}

const SunIcon = () => (
    <img
        style={{ width: 14, height: 14, marginLeft: -2, marginRight: 10 }}
        src={sunIcn}
    />
)
const MoonIcon = () => (
    <img
        style={{ width: 14, height: 14, marginLeft: 0, marginRight: 8 }}
        src={moonIcn}
    />
)
const ChatIcon = () => <img style={{ width: 20, height: 20 }} src={chatIcn} />
const InboxIcon = () => <img style={{ width: 20, height: 20 }} src={inboxIcn} />
const ReadIcon = () => <img style={{ width: 22, height: 22 }} src={readIcn} />

const Header = () => {
    const navigate = useNavigate()
    const { theme, setTheme } = useContext(CurrTheme)
    const { currUser, role } = useContext(CurrUser)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [userNotifications, setUserNotifications] = useState([
        {
            _id: 'no-notifs',
            appointment_id: null,
            doctor_id: null,
            patient_id: null,
            date: null,
            message_patient: 'No notifications',
            message_doctor: 'No notifications',
        },
    ])

    useEffect(() => {
        if (document.body.classList.contains('light-mode')) {
            if (localStorage.getItem('theme') === 'dark') {
                document.body.classList.remove('light-mode')
                document.body.classList.add('dark-mode')
                setTheme('dark')
            }
        } else {
            if (localStorage.getItem('theme') === 'light') {
                document.body.classList.remove('dark-mode')
                document.body.classList.add('light-mode')
                setTheme('light')
            }
        }
    }, [])

    const LogoIcon = () => (
        <img
            onClick={() => {
                navigate(`/${role}`)
            }}
            style={{ width: 100, cursor: 'pointer' }}
            src={logoIcn}
        />
    )

    useEffect(() => {
        if (currUser) {
            const type = role == 'patient' ? 'patient' : 'doctor'
            axiosApi
                .get(`/patient/get-notifications/${currUser._id}`, {
                    params: { type },
                })
                .then((res) => {
                    setUserNotifications(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [currUser])

    useEffect(() => {
        if (userNotifications.length === 0) {
            setUserNotifications([
                {
                    _id: 'no-notifs',
                    appointment_id: null,
                    doctor_id: null,
                    patient_id: null,
                    date: null,
                    message_patient: 'No notifications',
                    message_doctor: 'No notifications',
                },
            ])
        }
    }, [userNotifications])

    const handleTheme = () => {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.remove('light-mode')
            document.body.classList.add('dark-mode')
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.body.classList.remove('dark-mode')
            document.body.classList.add('light-mode')
            setTheme('light')
            localStorage.setItem('theme', 'light')
        }
    }

    const handleViewChat = () => {
        navigate('chat')
    }

    const handleVisibleChange = (flag) => {
        setVisible(flag)
    }

    const handleVisibleChange2 = (flag) => {
        setVisible2(flag)
    }

    const items = [
        {
            key: '1',
            label: (
                <a
                    onClick={() => {
                        navigate(`profile`)
                    }}>
                    View Profile
                </a>
            ),
            icon: <UserOutlined />,
        },
        {
            key: '2',
            label: (
                <a onClick={handleTheme}>
                    {theme === 'light' ? 'Light' : 'Dark'}
                </a>
            ),
            icon: theme === 'light' ? <SunIcon /> : <MoonIcon />,
        },
        {
            key: '3',
            label: (
                <a
                    onClick={() => {
                        axiosApi
                            .post('/auth/logout')
                            .then(() => {
                                message.success('Logged out successfully')
                                navigate('/')
                            })
                            .catch((err) => {
                                message.error('Error logging out')
                                console.log(err)
                            })
                    }}>
                    Logout
                </a>
            ),
            icon: <LogoutOutlined />,
            danger: true,
        },
    ]

    const notifications = userNotifications.map((notification) => {
        return {
            key: notification._id,
            label: (
                <div
                    className='notification-item'
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        cursor: 'default',
                    }}>
                    <p
                        style={{
                            width: '85%',
                            textAlign: 'left',
                            margin: 0,
                            cursor: 'default',
                        }}>
                        {role == 'patient'
                            ? notification.message_patient
                            : role == 'doctor'
                            ? notification.message_doctor
                            : 'change the code'}
                    </p>
                    {userNotifications[0]._id != 'no-notifs' ? (
                        <div
                            onClick={() => {
                                axiosApi
                                    .put(
                                        `/patient/remove-notification/${notification._id}/${currUser._id}`
                                    )
                                    .then(() => {
                                        setUserNotifications(
                                            userNotifications.filter(
                                                (notif) =>
                                                    notif._id !==
                                                    notification._id
                                            )
                                        )
                                        setVisible(false)
                                    })
                            }}
                            style={{
                                height: '100%',
                                cursor: 'pointer',
                                marginRight: '-12px',
                                padding: '16px',
                                backgroundColor: '#eee',
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = '#ddd')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = '#eee')
                            }>
                            <ReadIcon className='read-button' />
                        </div>
                    ) : null}
                </div>
            ),
        }
    })

    return (
        <header className='navbar'>
            <LogoIcon />
            <div id='navbar-buttons'>
                {role !== 'admin' && (
                    <Dropdown
                        trigger={['click']}
                        placement='bottom'
                        overlayStyle={{ borderRadius: 0 }}
                        menu={{
                            items: notifications,
                        }}
                        onOpenChange={handleVisibleChange}
                        open={visible}
                        getPopupContainer={(triggerNode) =>
                            triggerNode.parentNode
                        }
                        overlayClassName='notifs-class'>
                        <a
                            className='inbox-icon'
                            style={{ borderRadius: 0 }}
                            onClick={(e) => e.preventDefault()}>
                            <Badge
                                dot={userNotifications[0]?._id !== 'no-notifs'}>
                                <InboxIcon />
                            </Badge>
                        </a>
                    </Dropdown>
                )}
                <ConditionalRender condition={role != 'admin'}>
                    <div
                        id='wallet-amount'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '5px',
                        }}>
                        <WalletOutlined className='ant-wallet' />
                        <span>E£{currUser?.wallet?.toFixed(0)}</span>
                    </div>
                </ConditionalRender>
                <Dropdown
                    open={visible2}
                    onOpenChange={handleVisibleChange2}
                    menu={{
                        items,
                    }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <Avatar>
                                {currUser?.name?.charAt(0).toUpperCase() ?? (
                                    <UserOutlined />
                                )}
                            </Avatar>
                        </Space>
                    </a>
                </Dropdown>
            </div>
            {role !== 'admin' && (
                <FloatButton icon={<ChatIcon />} onClick={handleViewChat} />
            )}
        </header>
    )
}
export default Header
