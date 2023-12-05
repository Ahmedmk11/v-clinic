import React, { useState, useEffect, useContext } from 'react'
import moonIcn from '../../../assets/icons/dark/moon2.svg'
import sunIcn from '../../../assets/icons/sun.svg'

import CurrTheme from '../../../contexts/CurrTheme'

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode')
} else {
    document.body.classList.add('light-mode')
}

const SunIcon = () => (
    <img style={{ width: 22, height: 22, cursor: 'pointer' }} src={sunIcn} />
)
const MoonIcon = () => (
    <img style={{ width: 22, height: 22, cursor: 'pointer' }} src={moonIcn} />
)

const Theme = () => {
    const { theme, setTheme } = useContext(CurrTheme)

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

    return (
        <div className='logged-out-theme theme' onClick={handleTheme}>
            {theme === 'light' ? <SunIcon /> : <MoonIcon />}
        </div>
    )
}

export default Theme
