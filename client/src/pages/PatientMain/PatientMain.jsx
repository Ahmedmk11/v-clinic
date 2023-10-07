import { Routes, Route, useNavigate, Outlet } from 'react-router-dom'
import Layout from '../Layout/Layout'
import { useEffect, useState } from 'react'

const PatientHome = () => {
    const navigate = useNavigate()
    const [currUser, setCurrUser] = useState(null)

    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}

export default PatientHome
