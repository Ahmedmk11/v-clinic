import React, { useEffect, useState } from 'react'
import { DatePicker, Select } from 'antd'
import axios from 'axios'

import { formatDateRange } from '../../utils/convertDateToString.js'

const AppointmentsList = () => {
    const [appointmentsList, setAppointmentsList] = useState([])
    const [tempDoctorName, setTempDoctorName] = useState('')

    const [selectedSpecialities, setSelectedSpecialities] = useState([])
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

    useEffect(() => {
        axios
            .get(
                `http://localhost:3000/api/patient/get-patient-appointments/${currUser._id}`
            )
            .then((res) => {
                setAppointmentsList(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [currUser])

    const handleChange = (value) => {
        setSelectedSpecialities(value)
    }

    const handleDateChange = (dates) => {
        setDateRange(dates)
    }

    return (
        <div>
            <DatePicker
                showTime={{
                    format: 'hh:mm a',
                }}
                format='YYYY-MM-DD hh:mm a'
                onChange={handleDateChange}
            />
            <Select
                mode='multiple'
                allowClear
                placeholder='Select specialities'
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
            {appointmentsList.map(
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
