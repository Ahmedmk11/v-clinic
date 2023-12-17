import React, { useEffect, useState, useContext } from 'react'
import { DatePicker, Select, Button, Skeleton } from 'antd'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import CancelAppointment from './CancelAppointment.jsx'
import AppointmentReschedule from '../../doctor/DoctorAppointments/AppointmentReschedule.jsx'
import RequestFollowUp from './RequestFollowUp.jsx'
import { formatDateRange } from '../../../utils/convertDateToString.js'
import Pagination from '../../reusable/Pagination/Pagination.jsx'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import axiosApi from '../../../utils/axiosApi.js'
import CurrUserContext from '../../../contexts/CurrUser.jsx'

dayjs.extend(utc)

const AppointmentsList = ({ mode = 'patient' }) => {
    const [appointmentsList, setAppointmentsList] = useState([])
    const [displayedAppointments, setDisplayedAppointments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedStates, setSelectedStates] = useState([])
    const [dateRange, setDateRange] = useState(null)
    const [CancelAppointmentOpen, setCancelAppointmentOpen] = useState(false)
    const [AppointmentRescheduleOpen, setAppointmentRescheduleOpen] =
        useState(false)
    const [RequestFollowUpOpen, setRequestFollowUpOpen] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [skeleton, setSkeleton] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const { currUser } = useContext(CurrUserContext)
    const AppointmentsPerPage = 6
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
        setCurrentPage(1)
    }, [selectedStates, dateRange])

    useEffect(() => {
        if (appointmentsList.length > 0) {
            setIsLoading(false)
        }
    }, [appointmentsList])

    useEffect(() => {
        if (!currUser) {
            return
        }
        axiosApi
            .get(`/patient/get-${mode}-appointments/${currUser._id}`)
            .then((res) => {
                setAppointmentsList(res.data)
                setDisplayedAppointments(res.data)
                setSkeleton(false)
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
                <div className='card'>
                    <Skeleton active />
                </div>
            )

        return currentAppointments.length > 0
            ? currentAppointments.map((appointment) => (
                  <div className='card' key={appointment._id}>
                      <h2>{appointment?.patient_id?.name}</h2>
                      <h3>Dr. {appointment?.doctor_id.name}</h3>
                      <p>
                          <strong>
                              At{' '}
                              {formatDateRange(
                                  appointment.start_time,
                                  appointment.end_time
                              )}
                          </strong>
                      </p>
                      <p>
                          <strong>Status: </strong>
                          <span className={'status ' + appointment.status}>
                              {appointment.status}
                          </span>
                      </p>
                      <ConditionalRender
                          condition={
                              ![
                                  'completed',
                                  'cancelled',
                                  'pending',
                                  'rejected',
                              ].includes(appointment?.status?.toLowerCase())
                          }>
                          <div className='edit-buttons'>
                              <Button
                                  size='small'
                                  danger
                                  type='primary'
                                  onClick={() => {
                                      setCancelAppointmentOpen(true),
                                          setSelectedAppointment(appointment)
                                  }}>
                                  Cancel
                              </Button>
                              <Button
                                  size='small'
                                  type='primary'
                                  onClick={() => {
                                      setAppointmentRescheduleOpen(true),
                                          setSelectedAppointment(appointment)
                                  }}>
                                  Reschedule
                              </Button>
                          </div>
                      </ConditionalRender>
                      <ConditionalRender
                          condition={
                              appointment?.status?.toLowerCase() == 'completed'
                          }>
                          <div className='edit-buttons'>
                              <Button
                                  size='small'
                                  type='primary'
                                  onClick={() => {
                                      setRequestFollowUpOpen(true),
                                          setSelectedAppointment(appointment)
                                  }}>
                                  Request Follow-Up
                              </Button>
                          </div>
                      </ConditionalRender>
                  </div>
              ))
            : 'No appointments to show'
    }

    return (
        <div className='login-text'>
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
                    { label: 'Upcoming', value: 'upcoming' },
                    { label: 'Completed', value: 'completed' },
                    { label: 'Cancelled', value: 'cancelled' },
                    { label: 'Rescheduled', value: 'rescheduled' },
                    { label: 'Rejected', value: 'rejected' },
                    { label: 'Pending', value: 'pending' },
                ]}
            />
            <div className='card-list'>{getCurrentAppointments()}</div>
            <CancelAppointment
                Appointment={selectedAppointment}
                showModal={CancelAppointmentOpen}
                setShowModal={setCancelAppointmentOpen}
                setAppointments={setDisplayedAppointments}
                mode={mode}
            />
            <AppointmentReschedule
                Appointment={selectedAppointment}
                showModal={AppointmentRescheduleOpen}
                setShowModal={setAppointmentRescheduleOpen}
                setAppointments={setDisplayedAppointments}
            />
            <RequestFollowUp
                Appointment={selectedAppointment}
                showModal={RequestFollowUpOpen}
                setShowModal={setRequestFollowUpOpen}
                setAppointments={setDisplayedAppointments}
            />
            <Pagination
                itemsPerPage={AppointmentsPerPage}
                totalItems={displayedAppointments?.length}
                paginate={(pageNumber) => setCurrentPage(pageNumber)}
                currentPage={currentPage}
            />
        </div>
    )
}

export default AppointmentsList
