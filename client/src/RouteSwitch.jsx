import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login/Login'
import DoctorHome from './pages/DoctorHome/DoctorHome'
import NotFound, { Redirect } from './pages/NotFound/NotFound'

const RouteSwitch = () => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/doctor/*' element={<DoctorHome />} />
            <Route path='/NotFound' element={<NotFound />} />
            <Route path='*' element={<Redirect />} />
        </Routes>
    )
}

export default RouteSwitch
