import { useState, useEffect } from 'react'
import { DatePicker, Select } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import AppointmentCard from './AppointmentCard'
dayjs.extend(utc)
const DoctorAppointmentsList = ({ Appointments }) => {
    const [displayedAppointments, setDisplayedAppointments] =
        useState(Appointments)
    const [selectedStates, setSelectedStates] = useState([])
    const [dateRange, setDateRange] = useState(null)

    const applyFilters = () => {
        let filtered = Appointments
        if (selectedStates.length > 0) {
            filtered = filtered.filter((appointment) =>
                selectedStates.includes(appointment.status)
            )
        }
        if (dateRange) {
            const datePartOfRange = dayjs(dateRange).format('YYYY-MM-DD')
            filtered = filtered.filter((appointment) => {
                const datePartOfStartDate = dayjs(
                    appointment.start_time
                ).format('YYYY-MM-DD')
                const datePartOfEndDate = dayjs(appointment.end_time).format(
                    'YYYY-MM-DD'
                )
                return (
                    datePartOfStartDate === datePartOfRange ||
                    datePartOfEndDate === datePartOfRange
                )
            })
        }

        setDisplayedAppointments(filtered)
    }

    useEffect(() => {
        applyFilters()
    }, [selectedStates, dateRange])

    const handleChange = (value) => {
        setSelectedStates(value)
    }

    const handleDateChange = (dates) => {
        setDateRange(dates)
    }
    return (
        <div className='patient-list-conatiner'>
            <h2>My Appointments</h2>
            <label>Pick a date to filter on: </label>
            <DatePicker
                className='DatePicker'
                format='YYYY-MM-DD'
                onChange={handleDateChange}
            />
            <br></br>
            <label>Pick a status to filter on: </label>
            <Select
                className='Select'
                mode='multiple'
                allowClear
                placeholder='Select state'
                onChange={handleChange}
                options={[
                    {
                        label: 'Upcoming',
                        value: 'upcoming',
                    },
                    { label: 'Completed', value: 'completed' },
                    { label: 'Cancelled', value: 'cancelled' },
                    { label: 'Rescheduled', value: 'rescheduled' },
                ]}
            />
            <div className='patient-list'>
                {displayedAppointments.length > 0
                    ? displayedAppointments.map((appointment) => (
                          <AppointmentCard
                              key={appointment._id}
                              Appointment={appointment}
                          />
                      ))
                    : 'No appointments to show'}
            </div>
        </div>
    )
}
export default DoctorAppointmentsList
