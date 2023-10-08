import { useEffect, useState } from 'react'
import axios from 'axios'
import Search from '../../components/Search/Search'
import Pagination from '../../components/Pagination/Pagination'
import { DatePicker, Select } from 'antd'

import { generateDummyData } from '../../utils/generateDummyData'
import { findIntersection } from '../../utils/intersectionForSearch'

import './patientHome.css'
import DoctorCard from '../../components/DoctorCard/DoctorCard'

const { RangePicker } = DatePicker

const PatientHome = () => {
    // REQ 37 | View all doctors, DONE
    // REQ 38 | search by name or speciality, DONE
    // REQ 39 | filter by speciality and or availability, IN PROGRESS
    // REQ 40 | navigate to selected doctor
    const [doctors, setDoctors] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredDoctors, setFilteredDoctors] = useState(null)
    const [specialties, setSpecialties] = useState([])
    const doctorsPerPage = 8

    useEffect(() => {
        let options = []
        if (filteredDoctors?.length > 0) {
            filteredDoctors.forEach((doctor) => {
                if (!options.some((obj) => obj.value === doctor.speciality)) {
                    options.push({
                        label: doctor.speciality,
                        value: doctor.speciality,
                    })
                }
            })
        }
        setSpecialties(options)
    }, [filteredDoctors])

    const handleChange = (value) => {
        console.log(`selected ${value}`)
    }

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/doctor/get-doctors`)
            .then((res) => {
                setDoctors(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        if (doctors) {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            setFilteredDoctors(
                doctors.filter(
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
            )
            console.log(searchTerm.split(' '), doctors)
            setCurrentPage(1)
        }
    }, [searchTerm, doctors])

    const getDoctors = () => {
        const indexOfLastDoctor = currentPage * doctorsPerPage
        const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage
        const currentDoctor = filteredDoctors?.slice(
            indexOfFirstDoctor,
            indexOfLastDoctor
        )
        return currentDoctor ?? currentDoctor?.length > 0
            ? currentDoctor.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            : 'No doctors to show'
    }

    const onSearch = (searchString) => {
        setSearchTerm(searchString)
    }

    return (
        <section className='doctor-list-conatiner'>
            <h2>Doctors</h2>
            <Search onSearch={onSearch} />
            <div id='doctors-filters'>
                <RangePicker
                    showTime={{
                        format: 'hh:mm a',
                    }}
                    format='YYYY-MM-DD hh:mm a'
                />
                <Select
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
                totalItems={filteredDoctors?.length}
                paginate={(pageNumber) => setCurrentPage(pageNumber)}
                currentPage={currentPage}
            />
            <button
                onClick={() => {
                    generateDummyData(10, 'doctor')
                }}>
                Add Data
            </button>
        </section>
    )
}

export default PatientHome
