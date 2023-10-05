import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import ViewPatients from './pages/ViewPatients/ViewPatients'
import PatientInfo from './pages/PatientInfo/PatientInfo.jsx'
import NotFound from './pages/NotFound/NotFound'

const RouteSwitch = () => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/patients' element={<ViewPatients />} />
            <Route path='/patient/:id' element={<PatientInfo />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default RouteSwitch
