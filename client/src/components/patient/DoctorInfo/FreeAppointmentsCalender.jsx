import React, { useState } from 'react'
import { Divider, message } from 'antd'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import './FreeAppointmentCalender.css'
import ReserveAppointment from './ReserveAppointment'
const FreeAppointmentCalender = ({
    timeSlots,
    doctor,
    discount,
    setTimeSlots,
}) => {
    const [open, setOpen] = useState(false)
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const reserveSlot = (timeSlot) => {
        if (timeSlot.passed) {
            message.error('This slot has passed')
            return
        }
        if (!timeSlot.isFree) {
            message.error('This slot is reserved')
            return
        }
        setOpen(true)
    }
    const renderTimeSlots = (day) => {
        let timeSlotsOfDay = []
        timeSlotsOfDay =
            timeSlots?.filter((timeSlot) => timeSlot.day === day) || []
        if (timeSlotsOfDay[0]?.slots?.length < 1) timeSlotsOfDay = []
        return (
            <ConditionalRender
                condition={timeSlotsOfDay?.length > 0}
                elseComponent={<p>No Free Slots</p>}>
                <div className='slot-times'>
                    {timeSlotsOfDay[0]?.slots?.map((timeSlot, index) => {
                        const date =
                            timeSlotsOfDay[0]?.date.toDateString() +
                            ' ' +
                            timeSlot.startTime
                        return (
                            <button
                                key={index}
                                className={`slot-item${
                                    timeSlot.passed || !timeSlot.isFree
                                        ? ' reserved'
                                        : ''
                                }`}
                                onClick={() => {
                                    reserveSlot(timeSlot)
                                    setSelectedTimeSlot(timeSlot),
                                        setSelectedDate(date)
                                }}>
                                {timeSlot.startTime} - {timeSlot.endTime}
                            </button>
                        )
                    })}
                </div>
            </ConditionalRender>
        )
    }
    return (
        <div>
            {timeSlots?.map((slot, index) => (
                <div key={index}>
                    <Divider orientation='left'>{slot.day}</Divider>
                    {renderTimeSlots(slot.day)}
                </div>
            ))}
            <ReserveAppointment
                open={open}
                setOpen={setOpen}
                timeSlot={selectedTimeSlot}
                date={selectedDate}
                doctor={doctor}
                discount={discount}
                setTimeSlots={setTimeSlots}
                timeSlots={timeSlots}
            />
        </div>
    )
}

export default FreeAppointmentCalender
