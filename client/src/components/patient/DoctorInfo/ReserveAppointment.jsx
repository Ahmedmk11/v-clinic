import React, { useEffect, useState, useContext } from 'react'
import { Modal, Form, Select, message, Button } from 'antd'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import axiosApi from '../../../utils/axiosApi'
import CurrUserContext from '../../../contexts/CurrUser'
const { Option } = Select
const ReserveAppointment = ({
    open,
    setOpen,
    timeSlot,
    date,
    doctor,
    discount,
    setTimeSlots,
    timeSlots,
}) => {
    const { currUser, setCurrUser } = useContext(CurrUserContext)
    const [form] = Form.useForm()
    const [familyMemberProfiles, setFamilyMemberProfiles] = useState([])
    const [selectedFamilyMember, setSelectedFamilyMember] = useState(null)
    const [loading, setLoading] = useState(false)

    //fetch family members
    useEffect(() => {
        async function fetchFamilyMembers() {
            try {
                if (currUser) {
                    const res = await axiosApi.get(
                        `/patient/get-family/${currUser?._id}`
                    )
                    if (res.data.familyMemberProfiles?.length > 0) {
                        setFamilyMemberProfiles([
                            ...res.data.familyMemberProfiles,
                            { ...currUser, name: 'Yourself' },
                        ])
                    } else {
                        setFamilyMemberProfiles([
                            { ...currUser, name: 'Yourself' },
                        ])
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchFamilyMembers()
    }, [currUser])

    const payWithWallet = async () => {
        form.validateFields()
        const appointmentPrice = (
            (doctor.hourly_rate * 1.1).toFixed(0) * discount
        ).toFixed(0)
        const doctorID = doctor._id
        if (!selectedFamilyMember) return

        if (currUser?.wallet < appointmentPrice) {
            message.error('Insufficient Funds!')
            return
        }
        try {
            const ret = await axiosApi.post(
                `/patient/pay-appointment-wallet/${currUser?._id}`,
                { deduction: appointmentPrice, doctorID }
            )
            setCurrUser({ ...currUser, wallet: ret.data.wallet })
            reserveAppointment(appointmentPrice)
        } catch (error) {
            message.error('Something went wrong')
            console.log(error)
        }
    }

    const payWithCard = async () => {
        form.validateFields()
        const appointmentPrice = (
            (doctor.hourly_rate * 1.1).toFixed(0) * discount
        ).toFixed(0)
        const doctorID = doctor._id
        const startTime = new Date(date)
        const endTime = new Date(
            new Date(date).toDateString() + ' ' + timeSlot.endTime
        )
        if (!selectedFamilyMember) return

        try {
            const ret = await axiosApi.post(
                `/patient/pay-appointment-card/${selectedFamilyMember._id}`,
                { price: appointmentPrice, date, startTime, endTime, doctorID }
            )
            window.location = ret.data.ret
        } catch (error) {
            message.error('error')
            console.log(error)
        }
    }

    //reserve appointment
    const reserveAppointment = (appointmentPrice) => {
        const startTime = new Date(date)
        const endTime = new Date(
            new Date(date).toDateString() + ' ' + timeSlot.endTime
        )
        setLoading(true)
        axiosApi
            .post('/patient/add-appointment', {
                doctor_id: doctor._id,
                patient_id: selectedFamilyMember._id,
                date: date,
                start_time: startTime,
                end_time: endTime,
                fee: appointmentPrice,
            })
            .then((res) => {
                const day = startTime.toLocaleString('default', {
                    weekday: 'long',
                })
                timeSlots
                    .find((slot) => slot.day == day)
                    .slots.map((slot) => {
                        if (
                            slot.startTime == timeSlot.startTime &&
                            slot.endTime == timeSlot.endTime
                        )
                            slot.isFree = false

                        return slot
                    })
                setTimeSlots(timeSlots)
                setOpen(false)
                form.resetFields()
                setSelectedFamilyMember(null)
                message.success('Appointment reserved successfully')
            })
            .catch((err) => {
                message.error('Something went wrong')
                console.error(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <Modal
            title='Reserve Appointment'
            open={open}
            confirmLoading={loading}
            onCancel={() => {
                setOpen(false)
                setSelectedFamilyMember(null)
                form.resetFields()
            }}
            // onOk={reserveAppointment}
            // onOkText='Reserve'
            destroyOnClose
            footer={[
                <div className='edit-buttons'>
                    {/* cancel button, pay with card , pay with wallet */}
                    <Button
                        key='cancel'
                        onClick={() => {
                            setOpen(false)
                            setSelectedFamilyMember(null)
                            form.resetFields()
                        }}>
                        Cancel
                    </Button>
                    <Button
                        type='primary'
                        key='pay with card'
                        loading={loading}
                        onClick={payWithCard}>
                        Pay with card
                    </Button>
                    <Button
                        type='primary'
                        key='pay with wallet'
                        loading={loading}
                        onClick={payWithWallet}>
                        Pay with wallet
                    </Button>
                </div>,
            ]}>
            <Form form={form} layout='vertical'>
                <p className='main-text'>
                    <strong>Time:</strong> {timeSlot?.startTime} -{' '}
                    {timeSlot?.endTime}
                </p>
                <p className='main-text'>
                    <strong>Date:</strong> {new Date(date).toLocaleDateString()}
                </p>
                <p className='main-text'>
                    <strong>Session Price: </strong>
                    <ConditionalRender condition={discount != 1}>
                        <span style={{ textDecoration: 'line-through' }}>
                            {doctor?.hourly_rate?.toFixed(0)}
                        </span>{' '}
                    </ConditionalRender>
                    $
                    {((doctor.hourly_rate * 1.1).toFixed(0) * discount).toFixed(
                        0
                    )}
                </p>
                <Form.Item
                    name={'familyMember'}
                    label={
                        <span style={{ fontWeight: 'bold' }}>
                            Select a family member
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please select a family member!',
                        },
                    ]}>
                    <Select
                        style={{ width: 300 }}
                        onChange={(value) => {
                            setSelectedFamilyMember(
                                familyMemberProfiles.find(
                                    (member) => member._id == value
                                )
                            )
                        }}
                        placeholder='Select a family member'>
                        {familyMemberProfiles?.map((member, i) => (
                            <Select.Option
                                key={member._id}
                                value={member._id}
                                label={member.name}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}>
                                    <span>{member.name}</span>
                                </div>
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ReserveAppointment
