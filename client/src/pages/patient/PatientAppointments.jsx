import AppointmentsList from '../../components/patient/PatientAppointments/AppointmentsList.jsx'
import { Tabs } from 'antd'
const PatientAppointments = () => {
    return (
        <div className='page'>
            <div className='primary-container'>    
            <Tabs defaultActiveKey="1" >
                <Tabs.TabPane tab="My Appointments" key="1">
                    <AppointmentsList />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Family Appointments" key="2">
                    <AppointmentsList mode="family" />
                </Tabs.TabPane>
            </Tabs>
            </div>
        </div>
    )
}

export default PatientAppointments
