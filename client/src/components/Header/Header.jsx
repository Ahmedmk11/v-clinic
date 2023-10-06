import './header.css'

import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Avatar } from 'antd'

import moonIcn from '../../assets/icons/moon.svg'
import sunIcn from '../../assets/icons/sun.svg'

const SunIcon = () => <img style={{ width: 20, height: 20 }} src={sunIcn} />
const MoonIcon = () => <img style={{ width: 20, height: 20 }} src={moonIcn} />

const Header = () => {
    const navigate = useNavigate()
    const page = window.location.pathname.split('/')[1]
    const [theme, setTheme] = useState(
        document.body.classList.contains('light-mode') ? 'light' : 'dark'
    )
    const [currUser, setCurrUser] = useState(null) // TBA
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
                    navigate(`/${page}`)
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
                <Avatar
                    onClick={() => {
                        navigate('profile')
                    }}>
                    {currUser?.name?.charAt(0) ?? 'G'}
                </Avatar>
            </div>
        </header>
    )
}
export default Header
