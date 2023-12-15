import React from 'react'
import { Card, List, Avatar, Skeleton } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { formatDateRange } from '../../../utils/convertDateToString.js'
const UpcomingAppointment = ({ upcomingAppointment, loading }) => {
    return (
        <Card title='Upcoming Appointment' className='upcoming-app'>
            {loading ? (
                <Skeleton active />
            ) : (
                <List
                    dataSource={upcomingAppointment}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined />} />}
                                title={item.patientName}
                                description={
                                    item?.appointmentStartTime
                                        ? `Time: ${formatDateRange(item.appointmentStartTime, item.appointmentEndTime)}`
                                        : 'Waiting for patient to book an appointment'
                                }
                            />
                        </List.Item>
                    )}
                />
            )}
        </Card>
    )
}
export default UpcomingAppointment
