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
}) => {
    const [cancelLoading, setCancelLoading] = useState(false)
    const { currUser: Doctor,setCurrUser:serDoctor } = useContext(CurrUserContext)
    const closeModal = () => {
        setShowModal(false)
    }

    const handleConfirm = () => {
        setCancelLoading(true)
        axiosApi
            .patch(`/appointment/cancel-appointment-doctor`,{
                appointmentId: Appointment._id
            })
            .then((res) => {
                setAppointments((prev) => {
                    return prev.filter(
                        (appointment) => appointment._id !== Appointment._id
                    )
                })
                setCancelLoading(false)
                closeModal()
                message.success('Appointment cancelled')
                serDoctor({...Doctor, wallet: res.data.wallet})
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
            <p>
                Are you sure you want to cancel this appointment? The patient
                will be refunded immediately.
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
