import { useState } from 'react'
import { Button } from 'antd'
import { formatDateRange } from '../../../utils/convertDateToString.js'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import CancelAppointment from './CancelAppointment.jsx'
import AppointmentReschedule from './AppointmentReschedule.jsx'

const AppointmentCard = ({ Appointment,setAppointments }) => {
  const [CancelAppointmentOpen, setCancelAppointmentOpen] = useState(false)
  const [AppointmentRescheduleOpen, setAppointmentRescheduleOpen] = useState(false)

    return (
        <div className='card'>
            <h3>Patient: {Appointment.patient_id.name}</h3>
            <p>
                <strong>Status: </strong>
                <span className={'status ' + Appointment.status}>
                    {Appointment.status}
                </span>
            </p>
            <p>
                <strong>
                    {formatDateRange(
                        Appointment.start_time,
                        Appointment.end_time
                    )}
                </strong>
            </p>
            <ConditionalRender condition={!['completed','cancelled'].includes(Appointment?.status?.toLowerCase())}>
            <div className='edit-buttons'>
            <Button danger type='primary' onClick={()=>setCancelAppointmentOpen(true)}>Cancel</Button>
            <Button type='primary' onClick={()=>setAppointmentRescheduleOpen(true)} >Reschedule</Button>
            </div>
            </ConditionalRender>
            <CancelAppointment Appointment={Appointment} showModal={CancelAppointmentOpen} setShowModal={setCancelAppointmentOpen} setAppointments={setAppointments}/>
                        <AppointmentReschedule Appointment={Appointment} showModal={AppointmentRescheduleOpen} setShowModal={setAppointmentRescheduleOpen} setAppointments={setAppointments}/>
        </div>
    )
}

export default AppointmentCard
