import React from 'react'
import { useNavigate } from 'react-router-dom'
import logoIcn from '../../../assets/icons/logo.svg'

const LogoIcon = ({ role }) => {
    const navigate = useNavigate()
    return (
        <img
            onClick={() => {
                navigate(`/${role}`)
            }}
            style={{ width: 100, cursor: 'pointer' }}
            src={logoIcn}
        />
    )
}

export default LogoIcon
