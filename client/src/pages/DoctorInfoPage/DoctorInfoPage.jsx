import './doctorInfoPage.css'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DoctorInfoPage = () => {
    // REQ 41 | View all doctor details, DONE
    const { id } = useParams()
    const [doctor, setDoctor] = useState({})

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/doctor/get-doctor/${id}`)
            .then((res) => {
                setDoctor(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <div>
            <h2>Doctor Info</h2>
            <div className='doctor-info'>
                <h3>Dr. {doctor.name}</h3>
                <p>Speciality: {doctor.speciality}</p>
                <p>Education: {doctor.education}</p>
                <p>Affiliation: {doctor.affiliation}</p>
                <p>Hourly Rate: {doctor.hourly_rate}</p>
            </div>
        </div>
    )
}

export default DoctorInfoPage
