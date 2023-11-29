import { Modal, Button, Form, DatePicker, TimePicker, message } from 'antd';
import axiosApi from '../../../utils/axiosApi';
import disabledDate from '../../../utils/disabledDate';
const AppointmentReschedule = ({ Appointment, setAppointments ,showModal,setShowModal}) => {
    const [form] = Form.useForm()
    const closeModal = () => {
        setShowModal(false)
    }

    const onFinish = async () => {
        try {
            const values = await form.validateFields()
            const { date, start_time, end_time, ...restValues } = values
            const startDate = new Date(date) // Convert date string to Date object

            // Set the date part of start_time and end_time to match the 'date' field
            const startTime = new Date(start_time)
            startTime.setFullYear(startDate.getFullYear())
            startTime.setMonth(startDate.getMonth())
            startTime.setDate(startDate.getDate())

            const endTime = new Date(end_time)
            endTime.setFullYear(startDate.getFullYear())
            endTime.setMonth(startDate.getMonth())
            endTime.setDate(startDate.getDate())

            // Pass the updated values to onCreate
      await axiosApi.patch(`/appointment/reschedule-appointment`,{
                appointmentId: Appointment._id,
                date: startDate.toISOString(),
                start_time: startTime.toISOString(),
                end_time: endTime.toISOString()
            })
        setAppointments((prev) => {
                return prev.map((appointment) => {
                    if (appointment._id === Appointment._id) {
                        return {
                            ...appointment,
                            date: startDate.toISOString(),
                            start_time: startTime.toISOString(),
                            end_time: endTime.toISOString(),
                            status: 'rescheduled',
                        }
                    }
                    return appointment
                })
            })
            closeModal()
            form.resetFields()
            message.success('Appointment rescheduled')
        } catch (errorInfo) {
            console.log('Failed:', errorInfo)
            message.error('Error rescheduling appointment')
        }
    }



    return  <Modal
    open={showModal}
    okText='Add'
    title='Rechedule Appointment'
    onCancel={closeModal}
    width={300}
    footer={[
        <div key="footerDiv">
            <Button
                onClick={closeModal}>
                Cancel
            </Button>
            <Button
                    type='primary'
                key='next-button0'
                onClick={onFinish}>
                Rechedule
            </Button>
        </div>,
    ]}>
 <Form form={form} layout='vertical' name='create_appointment_form'>
        <Form.Item
            name='date'
            label='Date'
            rules={[
                {
                    required: true,
                    message: 'Please select the date!',
                },
            ]}>
            <DatePicker  disabledDate={disabledDate} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
            name='start_time'
            label='Start Time'
            rules={[
                {
                    required: true,
                    message: 'Please select the start time!',
                },
            ]}>
            <TimePicker format='HH:mm' />
        </Form.Item>
        <Form.Item
            name='end_time'
            label='End Time'
            rules={[
                {
                    required: true,
                    message: 'Please select the end time!',
                },
            ]}>
            <TimePicker format='HH:mm' />
        </Form.Item>
    </Form> 
</Modal>

}

export default AppointmentReschedule