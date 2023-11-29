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
      const response=await axiosApi.post(`/appointment/request-follow-up`,{
                doctor_id: Appointment.doctor_id,
                patient_id: Appointment.patient_id,
                date: startDate.toISOString(),
                start_time: startTime.toISOString(),
                end_time: endTime.toISOString()
            })
        setAppointments((prev) => {
                prev.push(response.data.followUp)
                return prev
            }

        )
            closeModal()
            form.resetFields()
            message.success('Follow-Up Requested')
        } catch (errorInfo) {
            console.log('Failed:', errorInfo)
            message.error('Error requesting follow-up')
        }
    }

    return  <Modal
    open={showModal}
    okText='Add'
    title='Request Follow-Up'
    onCancel={closeModal}
    width={300}
    footer={[
        <div key="footerDiv">
            <Button
                onClick={closeModal}>
                Cancel
            </Button>
            <Button
                key='next-button0'
               type='primary'
                onClick={onFinish}>
                Send Request
            </Button>
        </div>,
    ]}>
 <Form form={form} layout='vertical'>
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