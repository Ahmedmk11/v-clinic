import './header.css'
import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Avatar, Dropdown, Space, message } from 'antd'
import { useContext } from 'react'
import moonIcn from '../../../assets/icons/moon.svg'
import sunIcn from '../../../assets/icons/sun.svg'
import chatIcn from '../../../assets/icons/chat.svg'
import inboxIcn from '../../../assets/icons/inbox.svg'
import { UserOutlined, WalletOutlined, LogoutOutlined } from '@ant-design/icons'
import CurrUser from '../../../contexts/CurrUser'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import axiosApi from '../../../utils/axiosApi'
import { FloatButton } from 'antd'

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

const Header = () => {
    const navigate = useNavigate()
    const [theme, setTheme] = useState(
        document.body.classList.contains('light-mode') ? 'light' : 'dark'
    )
    const { currUser, role } = useContext(CurrUser)
    const [userNotifications, setUserNotifications] = useState([
        {
            _id: 'no-notifs',
            appointment_id: null,
            doctor_id: null,
            patient_id: null,
            type: null,
            date: null,
            message: 'No notifications',
        },
    ])

    useEffect(() => {
        if (currUser) {
            axiosApi
                .get(`/patient/get-notifications/${currUser._id}`)
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
                    type: null,
                    date: null,
                    message: 'No notifications',
                },
            ])
        }
    }, [userNotifications])

    const handleTheme = () => {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.remove('light-mode')
            document.body.classList.add('dark-mode')
            setTheme('dark')
        } else {
            document.body.classList.remove('dark-mode')
            document.body.classList.add('light-mode')
            setTheme('light')
        }
    }

    const handleViewChat = () => {
        navigate('/')
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
                <a
                // onClick={() => {
                //     navigate(notification.link)
                // }}
                >
                    {notification.message}
                </a>
            ),
        }
    })

    return (
        <header className='navbar'>
            <div
                className='logo'
                onClick={() => {
                    navigate(`/${role}`)
                }}>
                <span>V-</span>Clinic
            </div>
            <div id='navbar-buttons'>
                <Dropdown
                    placement='bottom'
                    overlayStyle={{ borderRadius: 0 }}
                    menu={{
                        items: notifications,
                    }}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    overlayClassName='notifs-class'>
                    <a
                        className='inbox-icon'
                        style={{ borderRadius: 0 }}
                        onClick={(e) => e.preventDefault()}>
                        <Badge dot={userNotifications[0]._id !== 'no-notifs'}>
                            <InboxIcon />
                        </Badge>
                    </a>
                </Dropdown>
                <ConditionalRender condition={role != 'admin'}>
                    <WalletOutlined className='ant-wallet' />
                    <span>{currUser?.wallet?.toFixed(0)} EGP</span>
                </ConditionalRender>
                <Dropdown
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
            <FloatButton icon={<ChatIcon />} onClick={handleViewChat} />
        </header>
    )
}
export default Header
