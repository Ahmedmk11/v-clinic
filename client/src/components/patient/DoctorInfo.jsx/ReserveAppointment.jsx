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
}) => {
    const { currUser } = useContext(CurrUserContext)
    const [form] = Form.useForm()
    const [familyMemberProfiles, setFamilyMemberProfiles] = useState([])
    const [selectedFamilyMember, setSelectedFamilyMember] = useState(null)

    //fetch family members
    useEffect(() => {
        async function fetchFamilyMembers() {
            try {
                if (currUser) {
                    console.log('currUser', currUser._id)
                    const res = await axiosApi.get(
                        `/patient/get-family/${currUser?._id}`
                    )
                    setFamilyMemberProfiles([
                        ...res.data.familyMemberProfiles,
                        { ...currUser, name: 'Yourself' },
                    ])
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchFamilyMembers()
    }, [currUser])

    const payWithWallet = () => {
        form.validateFields()
        if (!selectedFamilyMember) return
        //check if wallet has enough money
    }

    const payWithCard = () => {
        form.validateFields()
        if (!selectedFamilyMember) return
    }

    //reserve appointment
    const reserveAppointment = () => {
        const startTime = new Date(date)
        const endTime = new Date(
            new Date(date).toDateString() + ' ' + timeSlot.endTime
        )
        console.log(startTime.toTimeString(), endTime.toTimeString())
        axiosApi
            .post('/patient//add-appointment', {
                doctor_id: doctor._id,
                patient_id: selectedFamilyMember._id,
                date: date,
                start_time: startTime,
                end_time: endTime,
            })
            .then((res) => {
                setOpen(false)
                form.resetFields()
                message.success('Appointment reserved successfully')
            })
            .catch((err) => {
                message.error('Something went wrong')
                console.error(err)
            })
    }
    return (
        <Modal
            title='Reserve Appointment'
            open={open}
            onCancel={() => {
                setOpen(false)
                form.resetFields()
            }}
            // onOk={reserveAppointment}
            // onOkText='Reserve'
            destroyOnClose
            footer={[
                <div className='edit-buttons'>
                    {/* cancel button, pay with card , pay with wallet */}
                    <Button
                        danger
                        key='cancel'
                        onClick={() => {
                            setOpen(false)
                            form.resetFields()
                        }}>
                        Cancel
                    </Button>
                    <Button
                        type='primary'
                        key='pay with card'
                        onClick={payWithCard}>
                        Pay with card
                    </Button>
                    <Button
                        type='primary'
                        key='pay with wallet'
                        onClick={payWithWallet}>
                        Pay with wallet
                    </Button>
                </div>,
            ]}>
            <Form form={form} layout='vertical'>
                <p>
                    <strong>Time:</strong> {timeSlot?.startTime} -{' '}
                    {timeSlot?.endTime}
                </p>
                <p>
                    <strong>Date:</strong> {new Date(date).toLocaleDateString()}
                </p>
                <p>
                    <strong>Session Price: </strong>
                    <ConditionalRender condition={discount != 1}>
                        <span style={{ textDecoration: 'line-through' }}>
                            {doctor?.hourly_rate?.toFixed(0)}
                        </span>{' '}
                    </ConditionalRender>
                    {((doctor.hourly_rate * 1.1).toFixed(0) * discount).toFixed(
                        0
                    )}
                    EGP
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
