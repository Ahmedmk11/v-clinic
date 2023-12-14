import { useEffect, useState } from 'react'
import AdminPatientCard from './AdminPatientCard'
import Pagination from '../../reusable/Pagination/Pagination'
import Search from '../../reusable/Search/Search'
import { Skeleton } from 'antd'

const PatientList = ({ patients }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredPatients, setFilteredPatients] = useState(patients)
    const patientsPerPage = 8

    useEffect(() => {
        const filteredPatients = patients?.filter((patient) =>
            patient.username?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredPatients(filteredPatients)
        setCurrentPage(1)
    }, [searchTerm, patients])

    const getCurrentPatients = () => {
        if(!filteredPatients)
            return <div className='card'>
                <Skeleton active />
            </div>
        const indexOfLastPatient = currentPage * patientsPerPage
        const indexOfFirstPatient = indexOfLastPatient - patientsPerPage
        const currentPatients = filteredPatients.slice(
            indexOfFirstPatient,
            indexOfLastPatient
        )

        return currentPatients.length
            ? currentPatients.map((patient) => (
                  <AdminPatientCard key={patient._id} patient={patient} />
              ))
            : 'No patients to show'
    }

    const onSearch = (searchString) => {
        setSearchTerm(searchString)
    }

    return (
        <section className='primary-container'>
            <h2>Patients</h2>
            <Search onSearch={onSearch} placeholder={'username'} />
            <div className='card-list'>{getCurrentPatients()}</div>
            <Pagination
                itemsPerPage={patientsPerPage}
                totalItems={filteredPatients?.length}
                paginate={(pageNumber) => setCurrentPage(pageNumber)}
                currentPage={currentPage}
            />
        </section>
    )
}

export default PatientList
