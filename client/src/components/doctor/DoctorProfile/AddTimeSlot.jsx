import React, { useState } from 'react'
import { Modal, Form, Select, TimePicker, Button } from 'antd'
import moment from 'moment'

const { Option } = Select

const AddTimeSlot = ({ visible, setVisible, onSave }) => {
    const [form] = Form.useForm()
    const [selectedDays, setSelectedDays] = useState([])
    const [startTime, setStartTime] = useState(moment('09:00', 'HH:mm'))
    const [endTime, setEndTime] = useState(moment('10:00', 'HH:mm'))
    const [duration, setDuration] = useState(0)
    const [bufferTime, setBufferTime] = useState(0)
    const [timeSlots, setTimeSlots] = useState([])

    const handleSave = async () => {
        form.validateFields().then((values) => {
            const newTimeSlot = {
                days: values.days,
                startTime: values.timeInterval[0].format('HH:mm'),
                endTime: values.timeInterval[1].format('HH:mm'),
                duration: values.duration,
                bufferTime: values.bufferTime,
            }
            setTimeSlots([...timeSlots, newTimeSlot])
            const slots = []
            const start = moment(newTimeSlot.startTime, 'HH:mm')
            const end = moment(newTimeSlot.endTime, 'HH:mm')
            const fullDuration = moment.duration(end.diff(start))
            const minutes = fullDuration.asMinutes()
            const slotsCount = minutes / newTimeSlot.duration
            for (let i = 0; i < slotsCount; i++) {
                const slot = {
                    startTime: start.format('HH:mm'),
                    endTime: start
                        .add(newTimeSlot.duration, 'minutes')
                        .format('HH:mm'),
                }
                if (slot.endTime > newTimeSlot.endTime) break
                slots.push(slot)
                start.add(newTimeSlot.bufferTime, 'minutes')
            }

            const dayTimeSlots = newTimeSlot.days.map((day) => {
                return {
                    day,
                    slots,
                }
            })
            onSave(dayTimeSlots,form)
           
        })
    }

    return (
        <Modal
            title='Add Time Slots'
            open={visible}
            onCancel={() => {
                setVisible(false)
                form.resetFields()
            }}
            onOk={handleSave}
            okText='Save'>
            <Form form={form} layout='vertical'>
                <Form.Item
                    label='Select Days'
                    name='days'
                    rules={[
                        {
                            required: true,
                            message: 'Please select at least one day!',
                        },
                    ]}>
                    <Select
                        mode='multiple'
                        placeholder='Select days'
                        onChange={(value) => setSelectedDays(value)}>
                        <Option value='Monday'>Monday</Option>
                        <Option value='Tuesday'>Tuesday</Option>
                        <Option value='Wednesday'>Wednesday</Option>
                        <Option value='Thursday'>Thursday</Option>
                        <Option value='Friday'>Friday</Option>
                        <Option value='Saturday'>Saturday</Option>
                        <Option value='Sunday'>Sunday</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label='Select Time Interval'
                    name='timeInterval'
                    rules={[
                        {
                            required: true,
                            message: 'Please select a time interval!',
                        },
                    ]}>
                    <TimePicker.RangePicker format='HH:mm' />
                </Form.Item>
                <Form.Item
                    label='Duration'
                    name='duration'
                    rules={[
                        {
                            required: true,
                            message: 'Please select a duration!',
                        },
                    ]}>
                    <Select
                        // defaultValue={45}
                        onChange={(value) => setDuration(value)}>
                        <Option value={45}>45 mins</Option>
                        <Option value={60}>1 hour</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label='Buffer Time'
                    name='bufferTime'
                    rules={[
                        {
                            required: true,
                            message: 'Please select buffer time!',
                        },
                    ]}>
                    <Select onChange={(value) => setBufferTime(value)}>
                        <Option value={5}>5 mins</Option>
                        <Option value={10}>10 mins</Option>
                        <Option value={15}>15 mins</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default AddTimeSlot
