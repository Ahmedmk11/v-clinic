import { useState, useEffect } from 'react'
import { DatePicker, Select } from 'antd'
import Pagination from '../Pagination/Pagination'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import AppointmentCard from './AppointmentCard'
dayjs.extend(utc)
const DoctorAppointmentsList = ({ Appointments }) => {
    const [displayedAppointments, setDisplayedAppointments] =
        useState([])
        const [currentPage, setCurrentPage] = useState(1)
    const [selectedStates, setSelectedStates] = useState([])
    const [dateRange, setDateRange] = useState(null)
    const AppointmentsPerPage = 8
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
        setCurrentPage(1)
    }

    useEffect(() => {
        applyFilters()
    }, [selectedStates, dateRange, Appointments])

    const handleChange = (value) => {
        setSelectedStates(value)
    }

    const handleDateChange = (dates) => {
        setDateRange(dates)
    }
    const getCurrentAppointments = () => {
        const indexOfLastAppointment = currentPage * AppointmentsPerPage
        const indexOfFirstAppointment = indexOfLastAppointment - AppointmentsPerPage
        const currentAppointments = displayedAppointments.slice(
            indexOfFirstAppointment,
            indexOfLastAppointment
        )
        return currentAppointments.length > 0
            ? currentAppointments.map((appointment) => (
                  <AppointmentCard
                      key={appointment._id}
                      Appointment={appointment}
                  />
              ))
            : 'No appointments to show'
    }

    return (
        <div className='patient-list-conatiner'>
            <h2>My Appointments</h2>
            <label style={{margin:0}}>Pick a date to filter on: </label>
            <br></br>
            <DatePicker
                className='DatePicker'
                format='YYYY-MM-DD'
                onChange={handleDateChange}
            />
            <br></br>
            <label style={{margin:0}}>Pick a status to filter on: </label>
            <br></br>
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
                {getCurrentAppointments()}
            </div>
            <Pagination
                itemsPerPage={AppointmentsPerPage}
                totalItems={displayedAppointments.length}
                paginate={(pageNumber) => setCurrentPage(pageNumber)}
                currentPage={currentPage}
            />
        </div>
    )
}
export default DoctorAppointmentsList
