import { useEffect, useState } from 'react'
import axios from 'axios'
import Search from '../../../components/general/Search/Search'
import Pagination from '../../../components/general/Pagination/Pagination'
import { DatePicker, Select } from 'antd'

import { findIntersection } from '../../utils/intersectionForSearch'

import './patientHome.css'
import DoctorCard from '../../../old/components/DoctorCard/DoctorCard'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const PatientHome = () => {
    // REQ 37 | View all doctors, DONE
    // REQ 38 | search by name or speciality, DONE
    // REQ 39 | filter by speciality and or availability, DONE (FIX BUG WHEN FILTERING BY AVAILABILITY AND SPECIALITY)
    // REQ 40 | navigate to selected doctor DONE
    const [doctors, setDoctors] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [displayedDoctors, setDisplayedDoctors] = useState(null)
    const [filteredDoctors, setFilteredDoctors] = useState(null)
    const [specialties, setSpecialties] = useState([])
    const [appointments, setAppointments] = useState([])
    const [selectedSpecialities, setSelectedSpecialities] = useState([])
    const [dateRange, setDateRange] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [discount, setDiscount] = useState(1)
    const [currUser, setCurrUser] = useState(null)

    const doctorsPerPage = 8

    useEffect(() => {
        const fetchAppointments = async () => {
            const doctorsToAdd = []
            const promises = displayedDoctors.map(async (doctor) => {
                try {
                    const response = await axios.get(
                        `http://localhost:3000/api/doctor/get-appointments/${doctor._id}`
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

        if (displayedDoctors) {
            fetchAppointments()
        }
    }, [displayedDoctors])

    useEffect(() => {
        console.log('apps', appointments)
    }, [appointments])

    useEffect(() => {
        if (doctors) {
            setIsLoading(false)
        }
    }, [doctors])

    const searchByNameOrSpeciality = () => {
        return filteredDoctors?.filter(
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
        const doctorsToAdd = []
        if (doctors) {
            if (dateRange) {
                doctors.forEach((doctor) => {
                    const doctorAppointments = appointments.find(
                        (app) =>
                            app.did === doctor._id &&
                            app.appointments.length > 0
                    )

                    console.log('doctorAppointments', doctorAppointments)

                    if (!doctorAppointments) {
                        console.log(`no appointments for ${doctor.name}`)
                        doctorsToAdd.push(doctor)
                    } else {
                        console.log(`else for ${doctor.name}`)
                        const isBusy = doctorAppointments.appointments.every(
                            (appointment) => {
                                const selectedDateTime = dateRange

                                return (
                                    selectedDateTime >=
                                        dayjs.utc(appointment.start_time) &&
                                    selectedDateTime <=
                                        dayjs.utc(appointment.end_time) &&
                                    appointment.status !== 'cancelled' &&
                                    appointment.status !== 'completed'
                                )
                            }
                        )

                        if (!isBusy) {
                            doctorsToAdd.push(doctor)
                        }
                    }
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
        if (doctors?.length > 0) {
            doctors.forEach((doctor) => {
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
        axios
            .get(`http://localhost:3000/api/doctor/get-active-doctors`)
            .then((res) => {
                setDoctors(res.data)
            })
            .catch((err) => console.log(err))

        axios
            .get(
                `http://localhost:3000/api/patient/get-patient-by-id/652185cdf27b074cbbae82bc`
            )
            .then((res) => {
                setCurrUser(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        if (currUser) {
            axios
                .post(
                    `http://localhost:3000/api/patient/add-package-test/${currUser._id}`
                )
                .then((res) => {})
                .catch((err) => console.log(err))
            axios
                .get(
                    `http://localhost:3000/api/patient/get-patient-package/${currUser._id}`
                )
                .then((res) => {
                    setDiscount(1 - res.data.sessionDiscount / 100)
                    console.log(res.data)
                })
                .catch((err) => console.log(err))
        }
    }, [currUser])

    useEffect(() => {
        if (doctors) {
            const filteredSpecialities = filterBySpecialities()
            const filteredAvailability = filterByAvailability()

            console.log('filteredSpecialities', filteredSpecialities)
            console.log('filteredAvailability', filteredAvailability)
            console.log(dateRange)

            const filtered = intersection(
                filteredSpecialities,
                filteredAvailability
            )
            setFilteredDoctors(filtered)
        }
    }, [doctors, selectedSpecialities, dateRange])

    useEffect(() => {
        if (doctors) {
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            const searched = searchByNameOrSpeciality()

            const filtered = intersection(filteredDoctors, searched)

            setDisplayedDoctors(filtered)
            setCurrentPage(1)
        }
    }, [searchTerm, doctors, filteredDoctors])

    const getDoctors = () => {
        const indexOfLastDoctor = currentPage * doctorsPerPage
        const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage
        const currentDoctor = displayedDoctors?.slice(
            indexOfFirstDoctor,
            indexOfLastDoctor
        )
        return currentDoctor ?? currentDoctor?.length > 0
            ? currentDoctor.map((doctor) => (
                  <DoctorCard
                      key={doctor.id}
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
        <div className='viewPatients-page'>
            <section className='doctor-list-conatiner'>
                <h2>Doctors</h2>
                <Search disabled={isLoading} onSearch={onSearch} />
                <div id='doctors-filters'>
                    <DatePicker
                        disabled={isLoading}
                        showTime={{
                            format: 'hh:mm a',
                        }}
                        format='YYYY-MM-DD hh:mm a'
                        onChange={handleDateChange}
                    />
                    <Select
                        disabled={isLoading}
                        mode='multiple'
                        allowClear
                        placeholder='Select specialities'
                        onChange={handleChange}
                        options={specialties}
                    />
                </div>
                <div className='doctor-list'>{getDoctors()}</div>
                <Pagination
                    itemsPerPage={doctorsPerPage}
                    totalItems={displayedDoctors?.length}
                    paginate={(pageNumber) => setCurrentPage(pageNumber)}
                    currentPage={currentPage}
                />
                {/* <button
                    onClick={() => {
                        generateDummyData(10, 'doctor')
                    }}>
                    Add Data
                </button> */}
            </section>
        </div>
    )
}

export default PatientHome
