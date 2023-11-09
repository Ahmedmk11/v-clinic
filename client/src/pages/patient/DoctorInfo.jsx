import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axiosApi from '../../utils/axiosApi'

const DoctorInfo = () => {
    const location = useLocation()
    const discount = location.state.discount
    const { id } = useParams()
    const [doctor, setDoctor] = useState({})

    useEffect(() => {
        axiosApi
            .get(`/doctor/get-doctor/${id}`)
            .then((res) => {
                setDoctor(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <div className='page'>
            <div className='primary-container'>
                <h2>Selected Doctor</h2>
                <div className='patient-name'>
                    <h2>
                        Dr. {doctor.name}
                        {"'s Information"}
                    </h2>
                </div>
                <div className='sub-container'>
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
                        {(
                            (doctor.hourly_rate * 1.1).toFixed(0) * discount
                        ).toFixed(0)}{' '}
                        EGP
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DoctorInfo
