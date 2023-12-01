import { useState } from 'react'
import { Button,message } from 'antd'
import { formatDateRange } from '../../../utils/convertDateToString.js'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import CancelAppointment from './CancelAppointment.jsx'
import AppointmentReschedule from './AppointmentReschedule.jsx'
import AppointmentPrescription from './AppointmentPrescription.jsx'
import axiosApi from '../../../utils/axiosApi.js'

const AppointmentCard = ({ Appointment, setAppointments }) => {
    const [CancelAppointmentOpen, setCancelAppointmentOpen] = useState(false)
    const [AppointmentRescheduleOpen, setAppointmentRescheduleOpen] =
        useState(false)
    const [ViewPrescriptionOpen, setViewPrescriptionOpen] = useState(false)
    const [loadingAccept, setLoadingAccept] = useState(false)
    const [loadingReject, setLoadingReject] = useState(false)

    const AcceptFollowUp = () => {
        setLoadingAccept(true)
        axiosApi
            .patch(`/appointment/accept-follow-up`, {
                appointmentId: Appointment._id,
            })
            .then((res) => {
                setAppointments((prev) => {
                    return prev.map((appointment) => {
                        if (appointment._id === Appointment._id) {
                            return {
                                ...appointment,
                                status: 'upcoming',
                            }
                        }
                        return appointment
                    })
                })
                message.success('Follow-Up Accepted')
            })
            .catch((err) => {
                console.log(err)
                message.error('Error accepting follow-up')
            })
        setLoadingAccept(false)
    }

    const RejectFollowUp = () => {
        axiosApi
            .patch(`/appointment/reject-follow-up`, {
                appointmentId: Appointment._id,
            })
            .then((res) => {
                setAppointments((prev) => {
                    return prev.map((appointment) => {
                        if (appointment._id === Appointment._id) {
                            return {
                                ...appointment,
                                status: 'rejected',
                            }
                        }
                        return appointment
                    })
                })
                message.success('Follow-Up Rejected')
            })
            .catch((err) => {
                console.log(err)
                message.error('Error rejecting follow-up')
            })
    }

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
            <ConditionalRender
                condition={
                    !['completed', 'cancelled', 'pending', 'rejected'].includes(
                        Appointment?.status?.toLowerCase()
                    )
                }>
                <div className='edit-buttons'>
                    <Button
                        size='small'
                        danger
                        type='primary'
                        onClick={() => setCancelAppointmentOpen(true)}>
                        Cancel
                    </Button>
                    <Button
                        size='small'
                        type='primary'
                        onClick={() => setAppointmentRescheduleOpen(true)}>
                        Reschedule
                    </Button>
                </div>
            </ConditionalRender>
            <ConditionalRender
                condition={['completed'].includes(
                    Appointment?.status?.toLowerCase()
                )}>
                <div className='edit-buttons'>
                    <Button
                        type='primary'
                        onClick={() => setViewPrescriptionOpen(true)}>
                        View Prescription
                    </Button>
                </div>
            </ConditionalRender>
            <ConditionalRender
                condition={['pending'].includes(
                    Appointment?.status?.toLowerCase()
                )}>
                <div className='edit-buttons'>
                    <Button
                        size='small'
                        loading={loadingReject}
                        danger
                        type='primary'
                        onClick={RejectFollowUp}>
                        Reject
                    </Button>
                    <Button
                        size='small'
                        loading={loadingAccept}
                        type='primary'
                        onClick={AcceptFollowUp}>
                        Accept
                    </Button>
                </div>
            </ConditionalRender>
            <CancelAppointment
                Appointment={Appointment}
                showModal={CancelAppointmentOpen}
                setShowModal={setCancelAppointmentOpen}
                setAppointments={setAppointments}
            />
            <AppointmentReschedule
                Appointment={Appointment}
                showModal={AppointmentRescheduleOpen}
                setShowModal={setAppointmentRescheduleOpen}
                setAppointments={setAppointments}
            />
            <AppointmentPrescription
                Appointment={Appointment}
                showModal={ViewPrescriptionOpen}
                setShowModal={setViewPrescriptionOpen}
                setAppointments={setAppointments}
            />
        </div>
    )
}

export default AppointmentCard
