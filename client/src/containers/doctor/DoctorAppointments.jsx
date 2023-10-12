import './doctorAppointments.css'
import DoctorAppointmentsList from '../../components/doctor/DoctorAppointments/DoctorAppointmentsList.jsx'
import { useContext, useEffect,useState } from 'react'
import DoctorContext from '../../context/Doctor'
import axios from 'axios'

const DoctorAppointments = () => {
    const { Doctor } = useContext(DoctorContext)
    const [Appointments, setAppointments] = useState([])
    useEffect(() => {
        if (!Doctor._id) return
        axios.get(
            'http://localhost:3000/api/doctor/get-appointments-with-names/' + Doctor._id
        ).then((res) => {
           setAppointments(res.data)
        }).catch((err) => console.log(err))
    }, [Doctor])
    return (
        <div className='viewPatients-page'>
            <DoctorAppointmentsList Appointments={Appointments} />
        </div>
    )
}

export default DoctorAppointments
