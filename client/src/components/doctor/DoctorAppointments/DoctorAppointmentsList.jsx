import { useState, useEffect } from 'react'
import { DatePicker, Select } from 'antd'
import Pagination from '../../reusable/Pagination/Pagination'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import AppointmentCard from './AppointmentCard'
import { Skeleton } from 'antd'

dayjs.extend(utc)
const DoctorAppointmentsList = ({
    Appointments,
    setAppointments,
    mode = 'appointments',
    skeleton,
}) => {
    const [displayedAppointments, setDisplayedAppointments] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedStates, setSelectedStates] = useState(
        mode === 'requests' ? ['pending'] : []
    )
    const [dateRange, setDateRange] = useState(null)
    const AppointmentsPerPage = 6
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
        const indexOfFirstAppointment =
            indexOfLastAppointment - AppointmentsPerPage
        const currentAppointments = displayedAppointments.slice(
            indexOfFirstAppointment,
            indexOfLastAppointment
        )
        if (skeleton)
            return (
                <>
                    <div className='card'>
                        <Skeleton active />
                    </div>
                </>
            )
        return currentAppointments.length > 0
            ? currentAppointments.map((appointment) => (
                  <AppointmentCard
                      key={appointment._id}
                      Appointment={appointment}
                      setAppointments={setAppointments}
                  />
              ))
            : mode=='requests'?'No follow-up requests to view':'No appointments to view'
    }
    const filterOptions =
        mode == 'requests'
            ? [
                  {
                      label: 'Rejected',
                      value: 'rejected',
                  },
                  { label: 'Pending', value: 'pending' },
              ]
            : [
                  {
                      label: 'Upcoming',
                      value: 'upcoming',
                  },
                  { label: 'Completed', value: 'completed' },
                  { label: 'Cancelled', value: 'cancelled' },
                  { label: 'Rescheduled', value: 'rescheduled' },
              ]

    return (
        <div className='login-text'>
            <label style={{ margin: 0 }}>Pick a date to filter on: </label>
            <br></br>
            <DatePicker
                className='DatePicker'
                format='YYYY-MM-DD'
                onChange={handleDateChange}
            />
            <br></br>
            <label style={{ margin: 0 }}>Pick a status to filter on: </label>
            <br></br>
            <Select
                className='Select'
                mode='multiple'
                allowClear
                placeholder='Select state'
                onChange={handleChange}
                options={filterOptions}
                defaultValue={mode == 'requests' ? ['pending'] : []}
            />
            <div className='card-list'>{getCurrentAppointments()}</div>
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
