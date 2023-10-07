import { Routes, Route, useNavigate, Outlet } from 'react-router-dom'
import Layout from '../Layout/Layout'
import { useEffect, useState } from 'react'
import './patientHome.css'

const PatientHome = () => {
    const navigate = useNavigate()
    const [currUser, setCurrUser] = useState(null)

    return <div>Home</div>
}

export default PatientHome
