import { useEffect, useState } from 'react'
import AdminCard from './AdminCard'
import Pagination from '../../../../components/general/Pagination/Pagination'
import Search from '../../../../components/general/Search/Search'

const AdminList = ({ Admins, setAdmins }) => {
    // console.log(Admins)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredAdmins, setFilteredAdmins] = useState(Admins)
    const AdminsPerPage = 8

    useEffect(() => {
        const filteredAdmins = Admins.filter((admin) =>
            admin.Username?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredAdmins(filteredAdmins)
        setCurrentPage(1)
    }, [searchTerm, Admins])

    const handleDelete = (id) => {
        const updatedAdmins = Admins.filter((admin) => admin._id !== id)
        setAdmins(updatedAdmins)
    }

    const getCurrentAdmins = () => {
        const indexOfLastadmin = currentPage * AdminsPerPage
        const indexOfFirstadmin = indexOfLastadmin - AdminsPerPage
        const currentAdmins = filteredAdmins.slice(
            indexOfFirstadmin,
            indexOfLastadmin
        )

        return currentAdmins.length
            ? currentAdmins.map((admin) => (
                  <AdminCard
                      key={admin.Username}
                      admin={admin}
                      onDelete={handleDelete}
                  />
              ))
            : 'No Admins to show'
    }

    const onSearch = (searchString) => {
        setSearchTerm(searchString)
    }

    return (
        <section className='patient-list-conatiner'>
            <h2>Admins</h2>
            <Search onSearch={onSearch} placeholder={"username"}/>
            <div className='patient-list'>{getCurrentAdmins()}</div>
            <Pagination
                itemsPerPage={AdminsPerPage}
                totalItems={filteredAdmins.length}
                paginate={(pageNumber) => setCurrentPage(pageNumber)}
                currentPage={currentPage}
            />
        </section>
    )
}

export default AdminList
