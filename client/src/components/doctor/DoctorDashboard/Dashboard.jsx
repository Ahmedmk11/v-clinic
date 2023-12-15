import React, { useState, useEffect, useContext } from 'react'
import CurrUserContext from '../../../contexts/CurrUser'
import { Row, Col, Divider } from 'antd'
import AppointmentsGraph from './AppointmentsGraph'
import AdditionalStats from './AdditionalStats'
import LatestMessage from './LatestMessage'
import UpcomingAppointment from './UpcomingAppointment'
import './dashboard.css'
import axiosApi from '../../../utils/axiosApi'
import NewsSlider from './NewsSlider'

const Dashboard = () => {
    const [loading, setLoading] = useState(true)
    const [upcomingAppointments, setUpcomingAppointments] = useState([])
    const [lastMessages, setLastMessages] = useState([])
    const [appointmentsLastWeek, setAppointmentsLastWeek] = useState([])
    const [additionalStats, setAdditionalStats] = useState([])
    const { currUser: Doctor } = useContext(CurrUserContext)
    useEffect(() => {
        if (!Doctor) return
        axiosApi
            .get('/doctor/dashboard/' + Doctor?._id)
            .then((res) => {
                setUpcomingAppointments(res.data.nextAppointment)
                setLastMessages(res.data.lastMessage)
                setAppointmentsLastWeek(res.data.pastWeekAppointments)
                setAdditionalStats(res.data.doctorStats)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [Doctor])

    return (
        <div className='dashboard'>
            <Row gutter={16}>
                <Col span={24}>
                    <NewsSlider />
                </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
                <Col span={12}>
                    <UpcomingAppointment
                        upcomingAppointment={upcomingAppointments}
                        loading={loading}
                    />
                </Col>
                <Col span={12}>
                    <LatestMessage
                        lastMessage={lastMessages}
                        loading={loading}
                    />
                </Col>
            </Row>

            <Divider />

            <Row gutter={16}>
                <Col span={16}>
                    <AppointmentsGraph
                        appointmentsLastWeek={appointmentsLastWeek}
                        loading={loading}
                    />
                </Col>
                <Col span={8}>
                    <AdditionalStats
                        additionalStats={additionalStats}
                        loading={loading}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard
