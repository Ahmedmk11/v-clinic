import { Routes, Route, useNavigate } from 'react-router-dom'
import Layout from '../Layout/Layout'
import ViewPatients from '../ViewPatients/ViewPatients'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Redirect } from '../NotFound/NotFound'
import PatientInfo from '../../components/PatientInfo/PatientInfo'
import DoctorProfile from '../../components/DoctorProfile/DoctorProfile.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
const DoctorHome = () => {
    const [Doctor, setDoctor] = useState({})
    const navigate = useNavigate()
    const newLocal = //delete laterrrr
        (
            <div
                style={{
                    height: '100px',
                    textAlign: 'center',
                    fontSize: '4rem',
                }}>
                <button
                    style={{ fontSize: '2rem' }}
                    onClick={() => navigate('/doctor/profile')}>
                    Profile
                </button>
                <button
                    style={{ fontSize: '2rem', display: 'block' }}
                    onClick={() => navigate('/doctor/patients')}>
                    View Patients
                </button>
            </div>
        )
    const id = '651f4e29f81290fe0e1dd83a'
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/doctor/get-doctor/${id}`)
            .then((res) => setDoctor(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <Layout>
            <Sidebar />
            <Routes>
                <Route path='/' element={newLocal} />
                <Route
                    path='/profile'
                    element={
                        <DoctorProfile doctor={Doctor} setDoctor={setDoctor} />
                    }
                />
                <Route
                    path='/patients'
                    element={<ViewPatients doctorId={id} />}
                />
                <Route path='/patient/:id' element={<PatientInfo />} />
                <Route path='/*' element={<Redirect />} />
            </Routes>
        </Layout>
    )
}

export default DoctorHome
