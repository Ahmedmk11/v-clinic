import React from 'react'
import { Modal, Form, DatePicker, TimePicker, Button } from 'antd'
import axios from 'axios'

const CreateFollowUp = ({ visible,onCreate, onCancel }) => {
    const [form] = Form.useForm()

    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields()
                onCreate(values)
                form.resetFields()
            })
            .catch((errorInfo) => {
                console.log('Failed:', errorInfo)
            })
    }    
 
    return (
        <Modal
            open={visible}
            title='Schedule Follow Up'
            onCancel={onCancel}
            width={300}
            footer={[
                <div>
                    <Button
                        key='cancel-button'
                        id='cancel-button'
                        onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        key='next-button0'
                        id='green-button'
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
                    <TimePicker format='HH:mm'/>
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
                    <TimePicker format='HH:mm'/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateFollowUp
