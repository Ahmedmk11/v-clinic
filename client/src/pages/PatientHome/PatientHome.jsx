import { Routes, Route, useNavigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './patientHome.css'

const PatientHome = () => {
    // REQ 37 | View all doctors
    // REQ 38 | search by name or speciality
    // REQ 39 | filter by speciality and or availability
    // REQ 40 | navigate to selected doctor
    const navigate = useNavigate()
    const [currUser, setCurrUser] = useState(null)

    return <div>Home</div>
}

export default PatientHome
