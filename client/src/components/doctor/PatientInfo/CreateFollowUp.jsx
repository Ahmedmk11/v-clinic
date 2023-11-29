import React from 'react'
import { Modal, Form, DatePicker, TimePicker, Button } from 'antd'
import axios from 'axios'

const CreateFollowUp = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm()

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
            const updatedValues = {
                ...restValues,
                date: startDate.toISOString(), // Convert date object back to ISO string
                start_time: startTime.toISOString(), // Convert start_time object back to ISO string
                end_time: endTime.toISOString(), // Convert end_time object back to ISO string
            }

            // Call onCreate with updated values
            onCreate(updatedValues)
            form.resetFields()
        } catch (errorInfo) {
            console.log('Failed:', errorInfo)
        }
    }

    return (
        <Modal
            open={visible}
            title='Schedule Follow Up'
            onCancel={onCancel}
            width={300}
            footer={[
                <div key="footerdiv12">
                    <Button
                        onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        key='next-button0'
                       type='primary'
                        onClick={onFinish}>
                        Add
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
                    <DatePicker style={{ width: '100%' }} />
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
    )
}

export default CreateFollowUp
