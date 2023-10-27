import { useEffect, useState } from 'react'
import axios from 'axios'
import Search from '../../components/reusable/Search/Search'
import Pagination from '../../components/reusable/Pagination/Pagination'
import { DatePicker, Select } from 'antd'

import { findIntersection } from '../../utils/intersectionForSearch'
import DoctorCard from '../../components/patient/ViewDoctors/DoctorCard'

import { disabledDate } from '../../utils/disabledDates'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import CurrUserContext from '../../contexts/CurrUser'
import { useContext } from 'react'

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

    const doctorsPerPage = 8

    useEffect(() => {
        const fetchAppointments = async () => {
            const doctorsToAdd = []
            const promises = doctors.map(async (doctor) => {
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
        const doctorsToAdd = []
        if (doctors) {
            console.log('dateRange4444', dateRange)
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
        axios
            .get(`http://localhost:3000/api/doctor/get-active-doctors`)
            .then((res) => {
                setDoctors(res.data)
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
                })
                .catch((err) => console.log(err))
        }
    }, [currUser])

    useEffect(() => {
        if (doctors) {
            const filteredSpecialities = filterBySpecialities()
            const filteredAvailability = filterByAvailability()
            const searched = searchByNameOrSpeciality()

            console.log('filteredSpecialities', filteredSpecialities)
            console.log('filteredAvailability', filteredAvailability)
            console.log('searched', searched)

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
