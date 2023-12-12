import { useState,useContext } from 'react'
import { Modal, Button, message } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import axiosApi from '../../../utils/axiosApi'
import CurrUserContext from '../../../contexts/CurrUser'
const CancelAppointment = ({
    Appointment,
    setAppointments,
    showModal,
    setShowModal,
    mode
}) => {
    const [cancelLoading, setCancelLoading] = useState(false)
    const { currUser: Patient,setCurrUser:serPatient} = useContext(CurrUserContext)
    const closeModal = () => {
        setShowModal(false)
    }

    const handleConfirm = () => {
        setCancelLoading(true)
        axiosApi
            .patch(`/appointment/cancel-appointment-patient`,{
                appointmentId: Appointment._id
            })
            .then((res) => {
                setAppointments((prev) =>
                prev.map((appointment) => {
                    if (appointment._id === Appointment._id) {
                        return {
                            ...appointment,
                            status: 'cancelled',
                        }
                    }
                    return appointment
                })
            )
                setCancelLoading(false)
                closeModal()
                message.success('Appointment cancelled')
                if(mode==="patient")
                serPatient({...Patient, wallet: res.data.wallet})
            })
            .catch((err) => {
                setCancelLoading(false)
                console.log(err)
                message.error('Error cancelling appointment')
            })
    }

    return (
        <Modal
            title={
                <span>
                    <ExclamationCircleFilled
                        style={{ marginRight: 8, color: '#FFCC00' }}
                    />
                    Cancel Appointment
                </span>
            }
            open={showModal}
            confirmLoading={cancelLoading}
            onCancel={closeModal}
            footer={null}>
            <p className='main-text'>
                Are you sure you want to cancel this appointment? Cancelling less than 24 hours before the appointment is non-refundable!
            </p>
            <div className='edit-buttons'>
                <Button onClick={closeModal}>No, Keep Appointment</Button>
                <Button
                    loading={cancelLoading}
                    onClick={handleConfirm}
                    danger
                    type='primary'
                    style={{ marginRight: 8 }}>
                    Yes, Cancel Appointment
                </Button>
            </div>
        </Modal>
    )
}

export default CancelAppointment
