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
import AdminMain from './pages/AdminMain/AdminMain'
import AdminHome from './pages/AdminPages/AdminHome'
import AdminViewPatients from './pages/AdminPages/AdminviewPatients'
import AdminViewDoctors from './pages/AdminPages/AdminViewDoctors'
import DoctorProfile from './components/DoctorProfile/DoctorProfile'
import ViewPatients from './pages/ViewPatients/ViewPatients'
import PatientInfo from './components/PatientInfo/PatientInfo'
import AdminPatientInfo from './components/AdminComponents/AdminPatientInfo/AdminPatientInfo'
import AdminDoctorInfo from './components/AdminComponents/AdminDoctorInfo'
import AddAdminForm from './components/AdminComponents/AddAdminForm/AddAdminForm'
import AddPackageForm from './components/AdminComponents/AddPackageForm'
import AdminViewAdmins from './pages/AdminPages/AdminViewAdmins'
import AdminViewRequests from './pages/AdminPages/AdminViewRequests'
import DoctorAppointments from './components/DoctorAppointments/DoctorAppointments'
import AdminProfile from './components/AdminComponents/AdminProfile'
import PatientViewPrescription from './pages/PatientViewPrescription/PatientViewPrescription'
import PrescriptionInfo from './components/ViewPrescriptions/PrescriptionInfo'
import PatientRegistration from './pages/Register/Register'
import DoctorRegistration from './pages/Register/RegisterDoctor'
const RouteSwitch = () => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<PatientRegistration />} />
            <Route path='/register/doctor' element={<DoctorRegistration />} />
            <Route path='/doctor' element={<DoctorMain />}>
                <Route index element={<DoctorHome />} />
                <Route path='profile' element={<DoctorProfile />} />
                <Route path='patients' element={<ViewPatients />} />
                <Route path='patient/info' element={<PatientInfo />} />
                <Route path='appointments' element={<DoctorAppointments />} />
                <Route path='*' element={<Redirect />} />
            </Route>

            <Route path='/patient' element={<PatientMain />}>
                <Route index element={<PatientHome />} />
                <Route path='profile' element={<PatientProfile />} />
                <Route path='appointments' element={<PatientAppointments />} />
                <Route path='doctor-info/:id' element={<DoctorInfoPage />} />
                <Route path='view-prescriptions' element={<PatientViewPrescription/>} />
                <Route path='prescription-info' element={<PrescriptionInfo/>} />
                <Route path='*' element={<Redirect />} />
            </Route>

            <Route path='/admin' element={<AdminMain />}>
                <Route index element={<AdminHome />} />
                <Route path='profile' element={<AdminProfile />} />
                <Route path='view-doctors' element={<AdminViewDoctors />} />
                <Route path='view-patients' element={<AdminViewPatients />} />
                <Route path='view-admins' element={<AdminViewAdmins />} />
                <Route path='add-admin/' element={<AddAdminForm />} />
                <Route path='add-package/' element={<AddPackageForm />} />
                <Route path='patient/:id' element={<AdminPatientInfo />} />
                <Route path='doctor/:id' element={<AdminDoctorInfo />} />
                <Route path='view-requests' element={<AdminViewRequests />} />
                {/* <Route path='view-packages' element={<AdminViewPackages />} /> */}
                <Route path='*' element={<Redirect />} />
            </Route>

            <Route path='/NotFound' element={<NotFound />} />
            <Route path='*' element={<Redirect />} />
        </Routes>
    )
}

export default RouteSwitch
