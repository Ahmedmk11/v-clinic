import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './containers/general/Login/Login'
import PatientRegistration from './containers/patient/Register'
import DoctorRegistration from './containers/doctor/RegisterDoctor'
import DoctorMain from './containers/doctor/DoctorMain'
import DoctorHome from './containers/doctor/DoctorHome'
import DoctorProfile from './containers/doctor/DoctorProfile'
import ViewPatients from './containers/doctor/ViewPatients'
import PatientInfo from './containers/doctor/PatientInfo'
import DoctorAppointments from './containers/doctor/DoctorAppointments'
import PatientMain from './containers/patient/PatientMain'
import PatientHome from './containers/patient/PatientHome'
import PatientProfile from './containers/patient/PatientProfile'
import PatientAppointments from './containers/patient/PatientAppointments'
import DoctorInfo from './containers/patient/DoctorInfo'
import ViewPrescriptions from './containers/patient/ViewPrescriptions'
import PrescriptionInfo from './containers/patient/PrescriptionInfo'
import AdminMain from './containers/admin/AdminMain'
import AdminHome from './containers/admin/AdminHome'
import AdminProfile from './containers/admin/AdminProfile'
import AdminViewDoctors from './containers/admin/AdminViewDoctors'
import AdminViewPatients from './containers/admin/AdminViewPatients'
import ViewAdmins from './containers/admin/ViewAdmins'
import AddAdminForm from './containers/admin/AddAdminForm'
import AddPackageForm from './containers/admin/AddPackageForm'
import AdminPatientInfo from './containers/admin/AdminPatientInfo'
import AdminPackageInfo from './containers/admin/AdminPackageInfo'
import AdminDoctorInfo from './containers/admin/AdminDoctorInfo'
import ViewRequests from './containers/admin/ViewRequests'
import ViewPackages from './containers/admin/ViewPackages'
import NotFound , { Redirect } from './containers/general/NotFound/NotFound'


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
                <Route path='profile/:id' element={<DoctorProfile />} />
                <Route path='patients' element={<ViewPatients />} />
                <Route path='patient/info' element={<PatientInfo />} />
                <Route path='appointments' element={<DoctorAppointments />} />
                <Route path='*' element={<Redirect />} />
            </Route>

            <Route path='/patient' element={<PatientMain />}>
                <Route index element={<PatientHome />} />
                <Route path='profile/:id' element={<PatientProfile />} />
                <Route path='appointments' element={<PatientAppointments />} />
                <Route path='doctor-info/:id' element={<DoctorInfo />} />
                <Route
                    path='view-prescriptions'
                    element={<ViewPrescriptions />}
                />
                <Route
                    path='prescription-info'
                    element={<PrescriptionInfo />}
                />
                <Route path='*' element={<Redirect />} />
            </Route>

            <Route path='/admin' element={<AdminMain />}>
                <Route index element={<AdminHome />} />
                <Route path='profile/:id' element={<AdminProfile />} />
                <Route path='view-doctors' element={<AdminViewDoctors />} />
                <Route path='view-patients' element={<AdminViewPatients />} />
                <Route path='view-admins' element={<ViewAdmins />} />
                <Route path='add-admin/' element={<AddAdminForm />} />
                <Route path='add-package/' element={<AddPackageForm />} />
                <Route path='patient/:id' element={<AdminPatientInfo />} />
                <Route path='package/:id' element={<AdminPackageInfo />} />
                <Route path='doctor/:id' element={<AdminDoctorInfo />} />
                <Route path='view-requests' element={<ViewRequests />} />
                <Route path='view-packages' element={<ViewPackages />} /> 
                <Route path='*' element={<Redirect />} />
            </Route>

            <Route path='/NotFound' element={<NotFound />} />
            <Route path='*' element={<Redirect />} />
        </Routes>
    )
}

export default RouteSwitch
