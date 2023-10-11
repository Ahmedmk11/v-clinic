import './doctorInfoPage.css'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'

const DoctorInfoPage = () => {
    // REQ 41 | View all doctor details, DONE
    const location = useLocation()
    const discount = location.state.discount
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
        <div className='patient-info-container'>
            <h2>Selected Doctor</h2>
            <div className='patient-name'>
                <h2>
                    {doctor.name}
                    {"'s Information"}
                </h2>
            </div>
            <div className='patient-info'>
                <h3>Dr. {doctor.name}</h3>
                <p>
                    <strong>Speciality: </strong>
                    {doctor.speciality}
                </p>
                <p>
                    <strong>Education: </strong>
                    {doctor.education}
                </p>
                <p>
                    <strong>Affiliation: </strong>
                    {doctor.affiliation}
                </p>
                <p>
                    <strong>Session Price: </strong>
                    {((doctor.hourly_rate * 1.1).toFixed(0) * discount).toFixed(
                        0
                    )}{' '}
                    EGP
                </p>
            </div>
        </div>
    )
}

export default DoctorInfoPage
