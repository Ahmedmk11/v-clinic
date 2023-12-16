import { useEffect, useState } from 'react'
import Search from '../../components/reusable/Search/Search'
import Pagination from '../../components/reusable/Pagination/Pagination'
import { DatePicker, Select,Skeleton } from 'antd'
import './css/ViewDoctors.css'
import { findIntersection } from '../../utils/intersectionForSearch'
import DoctorCard from '../../components/patient/ViewDoctors/DoctorCard'

import { disabledDate } from '../../utils/disabledDates'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import CurrUserContext from '../../contexts/CurrUser'
import { useContext } from 'react'
import axiosApi from '../../utils/axiosApi'

dayjs.extend(utc)

const PatientHome = () => {
    const [doctors, setDoctors] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [displayedDoctors, setDisplayedDoctors] = useState(null)
    const [specialties, setSpecialties] = useState([])
    const [appointments, setAppointments] = useState([])
    const [selectedSpecialities, setSelectedSpecialities] = useState([])
    const [dateRange, setDateRange] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [discount, setDiscount] = useState(1)
    const { currUser } = useContext(CurrUserContext)
    const [skeleton, setSkeleton] = useState(true)

    const doctorsPerPage = 8

    useEffect(() => {
        const fetchAppointments = async () => {
            const doctorsToAdd = []
            const promises = doctors.map(async (doctor) => {
                try {
                    const response = await axiosApi.get(
                        `/doctor/get-appointments/${doctor._id}`
                    )
                    doctorsToAdd.push({
                        did: doctor._id,
                        appointments: response.data,
                    })
                } catch (error) {
                    console.error(error)
                }
            })

            // eslint-disable-next-line no-undef
            await Promise.all(promises)
            setAppointments(doctorsToAdd)
        }

        if (doctors) {
            fetchAppointments()
        }
    }, [doctors])

    useEffect(() => {
        if (doctors) {
            setIsLoading(false)
        }
    }, [doctors])

    const searchByNameOrSpeciality = () => {
        return doctors?.filter(
            (doctor) =>
                findIntersection(
                    searchTerm.split(' '),
                    doctor.name.split(' ')
                ) ||
                findIntersection(
                    searchTerm.split(' '),
                    doctor.speciality.split(' ')
                ) ||
                searchTerm === ''
        )
    }

    const filterBySpecialities = () => {
        let filtered = doctors
        if (doctors) {
            if (selectedSpecialities.length > 0) {
                filtered = doctors.filter((doctor) =>
                    selectedSpecialities.includes(doctor.speciality)
                )
            }
        }
        return filtered
    }

    const filterByAvailability = () => {
        let doctorsToAdd = []
        if (doctors) {
            if (dateRange) {
                doctors.forEach((doctor) => {
                    const doctorAppointments = appointments.find(
                        (app) =>
                            app.did === doctor._id &&
                            app.appointments.length > 0
                    )

                    if (!doctorAppointments) {
                        doctorsToAdd.push(doctor)
                    } else {
                        const isBusy = doctorAppointments.appointments.some(
                            (appointment) => {
                                const selectedDateTime = dateRange
                                return (
                                    selectedDateTime >=
                                        dayjs.utc(appointment.start_time) &&
                                    selectedDateTime <=
                                        dayjs.utc(appointment.end_time)
                                )
                            }
                        )

                        if (!isBusy) {
                            doctorsToAdd.push(doctor)
                        }
                    }
                })
                doctorsToAdd = doctorsToAdd.filter((doctor) => {
                    const selectedDateTime = dateRange
                    const days = doctor.timeSlots

                    if (!days || days.length === 0) {
                        return false
                    }

                    const dayStrings = days.map((dayObject) => dayObject.day)

                    if (!dayStrings.includes(selectedDateTime.format('dddd'))) {
                        return false
                    }

                    return days.some((day) => {
                        if (dayStrings.includes(day.day)) {
                            const timeSlot = day.slots
                            return timeSlot.some((slot) => {
                                const startTime = dayjs.utc(slot.startTime)
                                const endTime = dayjs.utc(slot.endTime)
                                if (
                                    selectedDateTime >= startTime &&
                                    selectedDateTime <= endTime
                                ) {
                                    return false
                                } else {
                                    return true
                                }
                            })
                        }
                        return false
                    })
                })
            } else {
                return doctors
            }
        }
        return doctorsToAdd
    }

    function intersection(array1, array2) {
        return array1?.filter((item) => array2?.includes(item))
    }

    useEffect(() => {
        let options = []
        if (displayedDoctors?.length > 0) {
            displayedDoctors.forEach((doctor) => {
                if (!options.some((obj) => obj.value === doctor.speciality)) {
                    options.push({
                        label: doctor.speciality,
                        value: doctor.speciality,
                    })
                }
            })
        }
        setSpecialties(options)
    }, [displayedDoctors])

    const handleChange = (value) => {
        setSelectedSpecialities(value)
    }

    const handleDateChange = (dates) => {
        setDateRange(dates)
    }

    useEffect(() => {
        axiosApi
            .get(`/doctor/get-active-doctors`)
            .then((res) => {
                setDoctors(res.data)
                setSkeleton(false)
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        if (currUser) {
            axiosApi
                .get(`/patient/get-patient-package/${currUser._id}`)
                .then((res) => {
                    if (res?.data?.sessionDiscount)
                        setDiscount(1 - res.data.sessionDiscount / 100)
                })
                .catch((err) => console.log(err))
        }
    }, [currUser])

    useEffect(() => {
        if (doctors) {
            const filteredSpecialities = filterBySpecialities()
            const filteredAvailability = filterByAvailability()
            const searched = searchByNameOrSpeciality()

            const filtered = doctors?.filter(
                (doctor) =>
                    filteredAvailability.includes(doctor) &&
                    filteredSpecialities.includes(doctor) &&
                    searched.includes(doctor)
            )
            setDisplayedDoctors(filtered)
            setCurrentPage(1)
        }
    }, [doctors, selectedSpecialities, dateRange, searchTerm])

    const getDoctors = () => {
        const indexOfLastDoctor = currentPage * doctorsPerPage
        const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage
        const currentDoctor = displayedDoctors?.slice(
            indexOfFirstDoctor,
            indexOfLastDoctor
        )
        if(skeleton) return (<div className='card'>
            <Skeleton active />
        </div>
        )
        return currentDoctor ?? currentDoctor?.length > 0
            ? currentDoctor.map((doctor) => (
                  <DoctorCard
                      key={doctor._id}
                      doctor={doctor}
                      discount={discount}
                  />
              ))
            : 'No doctors to show'
    }

    const onSearch = (searchString) => {
        setSearchTerm(searchString, true)
    }

    return (
        <div className='page'>
            <section className='primary-container'>
                <h2>Doctors</h2>
                <Search disabled={isLoading} onSearch={onSearch} />
                <label style={{ margin: 0 }}>Pick a date to filter on: </label>
                <br></br>
                <DatePicker
                    className='DatePicker'
                    disabled={isLoading}
                    disabledDate={disabledDate}
                    showTime={{
                        format: 'hh:mm a',
                    }}
                    format='YYYY-MM-DD hh:mm a'
                    onChange={handleDateChange}
                />
                <br></br>
                <label style={{ margin: 0 }}>
                    Pick a speciality to filter on:{' '}
                </label>
                <br></br>
                <Select
                    className='Select'
                    disabled={isLoading}
                    mode='multiple'
                    allowClear
                    placeholder='Select specialities'
                    onChange={handleChange}
                    options={specialties}
                />

                <div className='card-list'>{getDoctors()}</div>
                <Pagination
                    itemsPerPage={doctorsPerPage}
                    totalItems={displayedDoctors?.length}
                    paginate={(pageNumber) => setCurrentPage(pageNumber)}
                    currentPage={currentPage}
                />
            </section>
        </div>
    )
}

export default PatientHome
