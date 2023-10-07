import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login/Login'
import DoctorHome from './pages/DoctorHome/DoctorHome'
import PatientMain from './pages/PatientMain/PatientMain'
import PatientHome from './pages/PatientHome/PatientHome'
import DoctorInfoPage from './pages/DoctorInfoPage/DoctorInfoPage'
import PatientProfile from './components/PatientProfile/PatientProfile'
import PatientAppointments from './components/PatientAppointments/PatientAppointments'
import NotFound, { Redirect } from './pages/NotFound/NotFound'
import DoctorMain from './pages/DoctorMain/DoctorMain'
import DoctorProfile from './components/DoctorProfile/DoctorProfile'
import ViewPatients from './pages/ViewPatients/ViewPatients'
import PatientInfo from './components/PatientInfo/PatientInfo'

const RouteSwitch = () => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return (
        <Routes>
            <Route path='/' element={<Login />} />

            <Route path='/doctor' element={<DoctorMain />}>
                <Route index element={<DoctorHome />} />
                <Route path='profile' element={<DoctorProfile />} />
                <Route path='patients' element={<ViewPatients />} />
                <Route path='patient/info' element={<PatientInfo />} />
                {/* <Route path='appointments' element={<PatientAppointments />} /> */}
                <Route path='*' element={<Redirect />} />
            </Route>
            <Route path='/patient' element={<PatientMain />}>
                <Route index element={<PatientHome />} />
                <Route path='profile' element={<PatientProfile />} />
                <Route path='appointments' element={<PatientAppointments />} />
                <Route path='doctor-info/:id' element={<DoctorInfoPage />} />
                <Route path='*' element={<Redirect />} />
            </Route>

            <Route path='/NotFound' element={<NotFound />} />
            <Route path='*' element={<Redirect />} />
        </Routes>
    )
}

export default RouteSwitch
