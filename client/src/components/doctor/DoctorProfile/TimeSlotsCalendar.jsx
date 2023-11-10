import React from 'react'
import { Divider } from 'antd'
import './timeSlotsCalendar.css'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'

const TimeSlotsCalendar = ({ timeSlots }) => {
    const daysOfWeek = [
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
    ]

    const renderTimeSlots = (day) => {
        let timeSlotsOfDay = []
        timeSlotsOfDay = timeSlots?.filter((timeSlot) => timeSlot.day === day) || []
        return (
            <ConditionalRender
                condition={timeSlotsOfDay?.length > 0}
                elseComponent={<p>No Slots Added</p>}>
                <div className='slot-times'>
                    {timeSlotsOfDay[0]?.slots?.map((timeSlot, index) => (
                        <span key={index} className='slot-item'>
                            {timeSlot.startTime} - {timeSlot.endTime}
                        </span>
                    ))}
                </div>
            </ConditionalRender>
        )
    }

    return (
        <div>
            {daysOfWeek.map((day, index) => (
                <div key={index}>
                    <Divider orientation='left'>{day}</Divider>
                    {renderTimeSlots(day)}
                </div>
            ))}
        </div>
    )
}

export default TimeSlotsCalendar
