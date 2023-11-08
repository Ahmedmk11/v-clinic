import React, { useState, useContext } from 'react'
import { Button, message } from 'antd'
import TimeSlotsCalendar from './TimeSlotsCalendar'
import AddTimeSlot from './AddTimeSlot'
import { Divider } from 'antd'
import CurrUserContext from '../../../contexts/CurrUser'
import axios from 'axios'

const DoctorCalender = () => {
    const { currUser: Doctor, setCurrUser: setDoctor } =
        useContext(CurrUserContext)
    const [visible, setVisible] = useState(false)

    const onSaveTimeSlots = (timeSlots,form) => {
        let newTimeSlots = JSON.parse(JSON.stringify(Doctor.timeSlots))
        for (let i = 0; i < timeSlots.length; i++)
            newTimeSlots = newTimeSlots.filter(
                (slot) => slot.day !== timeSlots[i].day
            )
        console.log(newTimeSlots)
        newTimeSlots = [...newTimeSlots, ...timeSlots]
        console.log(newTimeSlots)
        axios
            .post('http://localhost:3000/api/doctor/updateTimeSlots', {
                newTimeSlots,
                id: Doctor._id,
            })
            .then((res) => {
                setDoctor({ ...Doctor, timeSlots: res.data.newTimeSlots })
                message.success('Time Slots Updated Successfully')
                form.resetFields()
                setVisible(false)
            })
            .catch((err) => {
                console.log(err)
                message.error('Failed to update time slots')
            })
    }
    return (
        <>
            <div className='sub-container'>
                <h2>Your Calendar</h2>
                <TimeSlotsCalendar timeSlots={Doctor.timeSlots} />
                <div className='edit-buttons' style={{ marginTop: '10px' }}>
                    <Button
                        type='primary'
                        onClick={() => {
                            setVisible(true)
                        }}>
                        Add Time Slots
                    </Button>
                </div>
                <AddTimeSlot
                    visible={visible}
                    setVisible={setVisible}
                    onSave={onSaveTimeSlots}
                />
                <Divider />
                <strong style={{ color: 'red' }}>Important Notes:</strong>
                <ul>
                    <li>
                        To start receiving appointment reservations, kindly
                        select your available time slots above.
                    </li>
                    <li>
                        Changing your time slots will not affect any existing
                        reservations.
                    </li>
                    <li>
                        Please be aware that modifying your time slots will
                        replace any existing selections for the modified days.
                        Ensure you review your choices thoroughly before
                        confirming any changes.
                    </li>
                </ul>
            </div>
        </>
    )
}

export default DoctorCalender