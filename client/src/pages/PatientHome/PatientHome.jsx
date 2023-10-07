import { useEffect, useState } from 'react'
import axios from 'axios'
import Search from '../../components/Search/Search'
import Pagination from '../../components/Pagination/Pagination'

import { generateDummyData } from '../../utils/generateDummyData'

import './patientHome.css'
import DoctorCard from '../../components/DoctorCard/DoctorCard'

const PatientHome = () => {
    // REQ 37 | View all doctors, DONE
    // REQ 38 | search by name or speciality, DONE
    // REQ 39 | filter by speciality and or availability
    // REQ 40 | navigate to selected doctor

    const [doctors, setDoctors] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredDoctors, setFilteredDoctors] = useState(null)
    const doctorsPerPage = 8

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
                        doctor.name
                            ?.toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                        doctor.speciality
                            ?.toLowerCase()
                            .includes(searchTerm.toLowerCase())
                )
            )
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
            <div className='doctor-list'>{getDoctors()}</div>
            <Pagination
                itemsPerPage={doctorsPerPage}
                totalItems={filteredDoctors?.length}
                paginate={(pageNumber) => setCurrentPage(pageNumber)}
                currentPage={currentPage}
            />{' '}
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
