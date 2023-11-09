import './css/doctorAppointments.css'
import DoctorAppointmentsList from '../../components/doctor/DoctorAppointments/DoctorAppointmentsList.jsx'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import CurrUserContext from '../../contexts/CurrUser'
import axiosApi from '../../utils/axiosApi'
const DoctorAppointments = () => {
    const { currUser: Doctor } = useContext(CurrUserContext)
    const [Appointments, setAppointments] = useState([])
    useEffect(() => {
        if (!Doctor) return
        axiosApi
            .get(
                '/doctor/get-appointments-with-names/' +
                    Doctor._id
            )
            .then((res) => {
                setAppointments(res.data)
            })
            .catch((err) => console.log(err))
    }, [Doctor])
    return (
        <div className='page'>
            <DoctorAppointmentsList Appointments={Appointments} />
        </div>
    )
}

export default DoctorAppointments
