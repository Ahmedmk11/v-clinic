import React, { useEffect, useState } from 'react'
import { DatePicker, Select } from 'antd'

import { formatDateRange } from '../../../utils/convertDateToString.js'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import axiosApi from '../../../utils/axiosApi.js'

dayjs.extend(utc)

const AppointmentsList = () => {
    const [appointmentsList, setAppointmentsList] = useState([])
    const [displayedAppointments, setDisplayedAppointments] = useState([])
    const [tempDoctorName, setTempDoctorName] = useState('')

    const [isLoading, setIsLoading] = useState(true)

    const [selectedStates, setSelectedStates] = useState([])
    const [dateRange, setDateRange] = useState(null)

    const [currUser, setCurrUser] = useState({
        _id: '652185cdf27b074cbbae82bc',
    })

    function getDoctor(id) {
        axiosApi
            .get(`/doctor/get-doctor/${id}`)
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
        axiosApi
            .get(
                `/patient/get-patient-appointments/${currUser._id}`
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
        <div className='primary-container'>
            <h2>My Appointments</h2>
            <label style={{ margin: 0 }}>Pick a date to filter on: </label>
            <br></br>
            <DatePicker
                disabled={isLoading}
                className='DatePicker'
                format='YYYY-MM-DD'
                onChange={handleDateChange}
            />
            <br></br>
            <label style={{ margin: 0 }}>Pick a status to filter on: </label>
            <br></br>
            <Select
                disabled={isLoading}
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
            <div className='card-list'>
                {displayedAppointments.map(
                    (appointment) => (
                        getDoctor(appointment.doctor_id),
                        (
                            <div className='card' key={appointment.id}>
                                <h3>Dr. {tempDoctorName}</h3>
                                <strong>
                                    {formatDateRange(
                                        appointment.start_time,
                                        appointment.end_time
                                    )}
                                </strong>
                                <p>
                                    <strong>Status: </strong>
                                    {appointment.status}
                                </p>
                            </div>
                        )
                    )
                )}
            </div>
        </div>
    )
}

export default AppointmentsList
