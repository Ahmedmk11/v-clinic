import { useEffect, useState } from 'react'
import AdminDoctorCard from './AdminDoctorCard'
import Pagination from '../../reusable/Pagination/Pagination'
import Search from '../../reusable/Search/Search'
import { Button, Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'

const AdminDoctorList = ({ doctors }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [filtereddoctors, setFiltereddoctors] = useState(doctors)
    const doctorsPerPage = 8
    const navigate = useNavigate()

    useEffect(() => {
        const filtereddoctors = doctors?.filter((doctor) =>
            doctor.username?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFiltereddoctors(filtereddoctors)
        setCurrentPage(1)
    }, [searchTerm, doctors])

    const getCurrentdoctors = () => {
        if(!filtereddoctors)
            return <div className='card'>
                <Skeleton active />
            </div>
        const indexOfLastdoctor = currentPage * doctorsPerPage
        const indexOfFirstdoctor = indexOfLastdoctor - doctorsPerPage
        const currentdoctors = filtereddoctors.slice(
            indexOfFirstdoctor,
            indexOfLastdoctor
        )
        return currentdoctors.length
            ? currentdoctors.map((doctor) => (
                  <AdminDoctorCard key={doctor._id} doctor={doctor} />
              ))
            : 'No doctors to show'
    }

    const onSearch = (searchString) => {
        setSearchTerm(searchString)
    }

    return (
        <section className='primary-container'>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                }}>
                <h2>Doctors</h2>
                <Button
                    onClick={() => {
                        navigate('/admin/view-requests')
                    }}>
                    View Requests
                </Button>
            </div>
            <Search onSearch={onSearch} placeholder={'username'} />
            <div className='card-list'>{getCurrentdoctors()}</div>
            <Pagination
                itemsPerPage={doctorsPerPage}
                totalItems={filtereddoctors?.length}
                paginate={(pageNumber) => setCurrentPage(pageNumber)}
                currentPage={currentPage}
            />
        </section>
    )
}

export default AdminDoctorList
