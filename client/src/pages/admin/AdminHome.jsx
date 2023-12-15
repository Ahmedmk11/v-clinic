import { useEffect, useState } from 'react'
import { Card, Row, Col, Statistic, Divider, Skeleton } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts'
import axiosApi from '../../utils/axiosApi'


const AdminHome = () => {
    const [subscriberCount, setSubscriberCount] = useState(0)
    const [nonSubscribers, setNonSubscribers] = useState(0)
    const [subscriptions, setSubscriptions] = useState([])
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])
    const [doctorRequests, setDoctorRequests] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      axiosApi.get('/admin/dashboard').then((res) => {
        doctors,
            setDoctors(res.data.doctors)
            setPatients(res.data.patients)
            setDoctorRequests(res.data.requests)
            setSubscriberCount(res.data.subscribers)
            setNonSubscribers(res.data.canceled)
            setSubscriptions(res.data.packages)
            console.log(res.data)
            setLoading(false)
        }
        ).catch((err) => {
            console.log(err)
        })
    }   
    , [])

    return (
        <div className='page'>
            <div className='primary-container dashboard'>
                <h2>Home</h2>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card title='Health Packages Subscriptions' className='health-packages'>
                            {loading ? (
                                <Skeleton active />
                            ) : (
                                <LineChart
                                    width={520}
                                    height={300}
                                    data={subscriptions}>
                                    <CartesianGrid strokeDasharray='3 3' />
                                    <XAxis dataKey='title' />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type='monotone'
                                        dataKey='subscriptions'
                                        stroke='#8884d8'
                                    />
                                </LineChart>
                            )}
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title='Users' className='user-count'>
                        {loading ? (
                                <Skeleton active />
                            ) : (  <Row gutter={16}>
                                <Col span={8}>
                                    <Statistic title='Patients' value={patients} />
                                </Col>
                                <Col span={8}>
                                    <Statistic title='Doctors' value={doctors} />
                                </Col>
                                <Col span={8}>
                                    <Statistic
                                        title='Doctor Requests'
                                        value={doctorRequests}
                                    />
                                </Col>
                            </Row>)}
                        </Card>
                        <Divider />
                        {loading ? (
                                <Skeleton active />
                            ) : (
                        <Card title='Current Subscriptions' className='subscriptions'>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic
                                        title='Health Package Subscribers'
                                        value={subscriberCount}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix={<ArrowUpOutlined />}
                                        suffix='User'
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic
                                        title='Non-Subscribers'
                                        value={nonSubscribers}
                                        valueStyle={{ color: '#cf1322' }}
                                        prefix={<ArrowDownOutlined />}
                                        suffix='User'
                                    />
                                </Col>
                            </Row>
                        </Card>)}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default AdminHome
