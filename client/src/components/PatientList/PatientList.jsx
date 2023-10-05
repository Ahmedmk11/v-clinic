import { useEffect, useState } from 'react'
import './patientList.css'
import PatientCard from '../PatientCard/PatientCard'
import Pagination from '../Pagination/Pagination'
import Search from '../Search/Search'

const PatientList = ({ patients }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredPatients, setFilteredPatients] = useState(patients)
    const [showUpcomingAppointments, setShowUpcomingAppointments] =
        useState(false)
    const patientsPerPage = 8

    useEffect(() => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const filteredPatients = patients.filter(
            (patient) =>
                (!showUpcomingAppointments ||
                    new Date(patient.nextAppointment) >= today) &&
                patient.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredPatients(filteredPatients)
        setCurrentPage(1)
    }, [searchTerm, showUpcomingAppointments, patients])

    const getCurrentPatients = () => {
        const indexOfLastPatient = currentPage * patientsPerPage
        const indexOfFirstPatient = indexOfLastPatient - patientsPerPage
        const currentPatients = filteredPatients.slice(
            indexOfFirstPatient,
            indexOfLastPatient
        )
        return currentPatients.length
            ? currentPatients.map((patient) => (
                  <PatientCard key={patient.id} patient={patient} />
              ))
            : 'No patients to show'
    }

    const onSearch = (searchString) => {
        setSearchTerm(searchString)
    }

    const onCheckboxChange = () => {
        setShowUpcomingAppointments(!showUpcomingAppointments)
    }

    return (
        <section className='patient-list-conatiner'>
            <h2>My Patients</h2>
            <Search onSearch={onSearch} />
            <label>
                Show Upcoming Appointments
                <input
                    type='checkbox'
                    checked={showUpcomingAppointments}
                    onChange={onCheckboxChange}
                />
            </label>
            <div className='patient-list'>{getCurrentPatients()}</div>
            <Pagination
                itemsPerPage={patientsPerPage}
                totalItems={filteredPatients.length}
                paginate={(pageNumber) => setCurrentPage(pageNumber)}
                currentPage={currentPage}
            />
        </section>
    )
}

export default PatientList