import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Skeleton } from 'antd'
import axiosApi from '../../utils/axiosApi'
import ConditionalRender from '../../components/reusable/ConditionalRender/ConditionalRender'
import DoctorFreeAppointments from '../../components/patient/DoctorInfo/DoctorFreeAppointments'
import CurrUserContext from '../../contexts/CurrUser'
const DoctorInfo = () => {
    const { currUser } = useContext(CurrUserContext)
    const id = window.location.href.split('/').pop()
    const [doctor, setDoctor] = useState({})
    const [discount, setDiscount] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axiosApi
            .get(`/doctor/get-doctor/${id}`)
            .then((res) => {
                setDoctor(res.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    useEffect(() => {
        if (currUser?.package)
            setDiscount(1 - currUser?.package.sessionDiscount / 100)
    }, [currUser])

    return (
        <div className='page'>
            <div className='primary-container'>
                <h2>Selected Doctor</h2>
                <div className='patient-name'>
                   {loading ? <Skeleton active  size={'small'}/> :  <h2>
                        Dr. {doctor.name}
                        {"'s Information"}
                    </h2>}
                </div>
                <div className='sub-container'>
                 {loading? <Skeleton active /> : <>
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
                        <ConditionalRender
                            condition={currUser?.package != null}>
                            <span style={{ textDecoration: 'line-through' }}>
                                {doctor?.hourly_rate?.toFixed(0)}
                            </span>{' '}
                        </ConditionalRender>
                        $
                        {(
                            (doctor.hourly_rate * 1.1).toFixed(0) * discount
                        ).toFixed(0)}{' '}
                    </p>
                  </>}
                </div>
                <DoctorFreeAppointments doctor={doctor} discount={discount} />
            </div>
        </div>
    )
}

export default DoctorInfo
