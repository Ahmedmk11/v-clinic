import './header.css'

import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Avatar } from 'antd'

import moonIcn from '../../../assets/icons/moon.svg'
import sunIcn from '../../../assets/icons/sun.svg'
import { UserOutlined, WalletOutlined } from '@ant-design/icons'
import axios from 'axios'

const SunIcon = () => <img style={{ width: 20, height: 20 }} src={sunIcn} />
const MoonIcon = () => <img style={{ width: 20, height: 20 }} src={moonIcn} />

const Header = () => {
    const navigate = useNavigate()
    const page = window.location.pathname.split('/')[1]
    const [wallet, setWallet] = useState(0);
    const [theme, setTheme] = useState(
        document.body.classList.contains('light-mode') ? 'light' : 'dark'
    )
    const [currUser, setCurrUser] = useState({
        _id: '652185cdf27b074cbbae82bc', // TBA in next sprints
    })

    useEffect(() => {
        let apiString;
        if (page == 'patient')
            apiString = `http://localhost:3000/api/patient/get-patient-by-id/${currUser._id}`
        else if (page == 'doctor')
            apiString = `http://localhost:3000/api/doctor/get-doctor/${currUser._id}`
        if (page != 'admin'){
            axios
             .get(apiString)
                .then((res) => {
                    console.log(res.data)
                 setWallet(res.data.wallet)
                })
                .catch((err) => {
                    console.log(err)
                 })
        }
    }, [currUser._id])


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
                {page != 'admin' ? (
                 <><WalletOutlined  style={{ fontSize: '17px', color: '#FFFFFF'}}/>
                <p style={{color:'rgba(255, 255, 255, 0.8)', marginRight: '4px'}}>{wallet} EGP</p> </>)
                : null}
                <Avatar
                    onClick={() => {
                        navigate(`profile/${currUser._id}`)
                    }}>
                    {currUser?.name?.charAt(0) ?? <UserOutlined />}
                </Avatar>
            </div>
        </header>
    )
}
export default Header
