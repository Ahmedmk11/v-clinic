import React, { useEffect, useState } from 'react'
import { DatePicker, Select } from 'antd'
import axios from 'axios'

import { formatDateRange } from '../../utils/convertDateToString.js'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const AppointmentsList = () => {
    const [appointmentsList, setAppointmentsList] = useState([])
    const [displayedAppointments, setDisplayedAppointments] = useState([])
    const [tempDoctorName, setTempDoctorName] = useState('')

    const [isLoading, setIsLoading] = useState(true)

    const [selectedStates, setSelectedStates] = useState([])
    const [dateRange, setDateRange] = useState(null)

    const [currUser, setCurrUser] = useState({
        _id: '652185ccf27b074cbbae82b6', // TBA in next sprints
    })

    function getDoctor(id) {
        axios
            .get(`http://localhost:3000/api/doctor/get-doctor/${id}`)
            .then((res) => {
                setTempDoctorName(res.data.name)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const applyFilters = () => {
        let filtered = appointmentsList

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

    useEffect(() => {
        if (appointmentsList.length > 0) {
            setIsLoading(false)
        }
    }, [appointmentsList])

    useEffect(() => {
        axios
            .get(
                `http://localhost:3000/api/patient/get-patient-appointments/${currUser._id}`
            )
            .then((res) => {
                setAppointmentsList(res.data)
                setDisplayedAppointments(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [currUser])

    const handleChange = (value) => {
        setSelectedStates(value)
    }

    const handleDateChange = (dates) => {
        setDateRange(dates)
    }

    return (
        <div>
            <DatePicker
                disabled={isLoading}
                format='YYYY-MM-DD'
                onChange={handleDateChange}
            />
            <Select
                disabled={isLoading}
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
            {displayedAppointments.map(
                (appointment) => (
                    getDoctor(appointment.doctor_id),
                    (
                        <div key={appointment.id}>
                            <p>{tempDoctorName}</p>
                            <p>{appointment.status}</p>
                            <p>
                                {formatDateRange(
                                    appointment.start_time,
                                    appointment.end_time
                                )}
                            </p>
                        </div>
                    )
                )
            )}
        </div>
    )
}

export default AppointmentsList
