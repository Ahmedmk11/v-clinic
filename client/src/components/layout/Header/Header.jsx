import './header.css'
import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Avatar } from 'antd'
import { useContext } from 'react'
import moonIcn from '../../../assets/icons/moon.svg'
import sunIcn from '../../../assets/icons/sun.svg'
import { UserOutlined, WalletOutlined } from '@ant-design/icons'
import CurrUser from '../../../contexts/CurrUser'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'

const SunIcon = () => <img style={{ width: 20, height: 20 }} src={sunIcn} />
const MoonIcon = () => <img style={{ width: 20, height: 20 }} src={moonIcn} />
const Header = () => {
    const navigate = useNavigate()
    const [theme, setTheme] = useState(
        document.body.classList.contains('light-mode') ? 'light' : 'dark'
    )
    const { currUser, role } = useContext(CurrUser)

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
                <Button
                    type='text'
                    onClick={handleTheme}
                    icon={theme === 'light' ? <SunIcon /> : <MoonIcon />}>
                    {theme === 'light' ? <p>Light</p> : <p>Dark</p>}
                </Button>
                <ConditionalRender condition={role != 'admin'}>
                    <WalletOutlined className='ant-wallet' />
                    <span>{currUser?.wallet} EGP</span>
                </ConditionalRender>
                <Avatar
                    onClick={() => {
                        navigate(`profile`)
                    }}>
                    {currUser?.name?.charAt(0) ?? <UserOutlined />}
                </Avatar>
            </div>
        </header>
    )
}
export default Header
