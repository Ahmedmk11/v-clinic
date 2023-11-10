import axiosApi from '../../../utils/axiosApi'
import TimeSlotsCalendar from '../../doctor/DoctorProfile/TimeSlotsCalendar'
import FreeAppointmentCalender from './FreeAppointmentsCalender'
import { useEffect, useState } from 'react'
const DoctorFreeAppointments = ({ doctor,discount }) => {
    const [timeSlots, setTimeSlots] = useState([])

    useEffect(() => {
        sortSchedule(doctor.timeSlots)
    }, [doctor])

    const sortSchedule = (schedule) => {
        if (!schedule) return
        const daysOfWeek = [
            'Saturday',
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
        ]
        for (let i = 0; i < 7; i++)
            if (schedule.find((day) => day.day === daysOfWeek[i]) === undefined)
                schedule.push({ day: daysOfWeek[i], slots: [] })

        const currentDayName = new Date().toLocaleString('default', {
            weekday: 'long',
        })
        let currentDayIndex = daysOfWeek.indexOf(currentDayName)
        let sortedSchedule = []
        let i = currentDayIndex
        let currDate = new Date()
        while (i < 7) {
            sortedSchedule.push({
                ...schedule.find((slot) => slot.day === daysOfWeek[i]),
                date: new Date(currDate),
            })
            currDate.setDate(currDate.getDate() + 1)
            i++
        }
        if (sortedSchedule.length < 7) {
            i = 0
            while (i < currentDayIndex) {
                sortedSchedule.push({
                    ...schedule.find((slot) => slot.day === daysOfWeek[i]),
                    date: new Date(currDate),
                })
                currDate.setDate(currDate.getDate() + 1)
                i++
            }
        }
        filterSchedule(sortedSchedule)
    }

    const filterSchedule = (schedule) => {
        axiosApi.get('/doctor/get-appointments/' + doctor._id).then((res) => {
            // console.log(res.data)
            const appointments = res.data.filter(
                (appointment) => appointment.status == 'upcoming'
            )
            for (let i = 0; i < schedule.length; i++) {
                const slotDate = new Date(schedule[i].date)
                schedule[i].slots = schedule[i].slots.map((slot) => {
                    let isFree = appointments
                        .filter((appointment) => {
                            const appointment_start_time = new Date(
                                appointment.start_time
                            )
                            const appointment_end_time = new Date(
                                appointment.end_time
                            )
                            if (
                                slotDate.getFullYear() ==
                                    appointment_start_time.getFullYear() &&
                                slotDate.getMonth() ==
                                    appointment_start_time.getMonth() &&
                                slotDate.getDate() ==
                                    appointment_start_time.getDate()
                            )
                                return true
                        })
                        .every((appointment) => {
                            const appointment_start_time = new Date(
                                appointment.start_time
                            ).getTime()
                            const appointment_end_time = new Date(
                                appointment.end_time
                            ).getTime()
                            const slot_start_time = new Date(
                                slotDate.toDateString() + ' ' + slot.startTime
                            ).getTime()
                            const slot_end_time = new Date(
                                slotDate.toDateString() + ' ' + slot.endTime
                            ).getTime()
                                
                            if (
                                slot_start_time >
                                    appointment_end_time||
                                slot_end_time <
                                    appointment_start_time
                            ) {
                                return true
                            }
                        })
                    const slot_start_time = new Date(
                        slotDate.toDateString() + ' ' + slot.startTime
                    ).getTime()
                    slot = {
                        ...slot,
                        passed: slot_start_time < new Date().getTime(),
                    }
                    return { ...slot, isFree }
                })
            }
           setTimeSlots(schedule)
        })
    }

    return (
        <div className='sub-container'>
            <h2>Free Appointments</h2>
            <p> Choose and Click on a free appointment to reserve</p>
            <br />
            <FreeAppointmentCalender
                timeSlots={timeSlots}
                useTimeSlots
                doctor={doctor}
                discount={discount}
                setTimeSlots={setTimeSlots}
            />
        </div>
    )
}
export default DoctorFreeAppointments
