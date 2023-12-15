import './css/doctorAppointments.css'
import DoctorAppointmentsList from '../../components/doctor/DoctorAppointments/DoctorAppointmentsList.jsx'
import { useContext, useEffect, useState } from 'react'
import CurrUserContext from '../../contexts/CurrUser'
import axiosApi from '../../utils/axiosApi'
import { Tabs } from 'antd'
const DoctorAppointments = () => {
    const { currUser: Doctor } = useContext(CurrUserContext)
    const [Appointments, setAppointments] = useState([])
    const [skeleton, setSkeleton] = useState(true)
    useEffect(() => {
        if (!Doctor) return
        axiosApi
            .get('/doctor/get-appointments-with-names/' + Doctor._id)
            .then((res) => {
                setAppointments(res.data)
            })
            .catch((err) => console.log(err))
            .finally(() => setSkeleton(false))
    }, [Doctor])
    return (
        <div className='page'>
            <div className='primary-container'>
                <Tabs defaultActiveKey='1'>
                    <Tabs.TabPane tab='My Appointments' key='1'>
                        <DoctorAppointmentsList
                            skeleton={skeleton}
                            Appointments={Appointments.filter(
                                (app) =>
                                    !['pending', 'rejected'].includes(
                                        app?.status.toLowerCase()
                                    )
                            )}
                            setAppointments={setAppointments}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Follow-Up Requests' key='2'>
                        <DoctorAppointmentsList
                            skeleton={skeleton}
                            Appointments={Appointments.filter((app) =>
                                ['pending', 'rejected'].includes(
                                    app?.status.toLowerCase()
                                )
                            )}
                            setAppointments={setAppointments}
                            mode='requests'
                        />
                    </Tabs.TabPane>
                </Tabs>
            </div>
            {/* <DoctorAppointmentsList Appointments={Appointments} setAppointments={setAppointments}/> */}
        </div>
    )
}

export default DoctorAppointments
