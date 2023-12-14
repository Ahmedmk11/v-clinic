import { useEffect, useState } from 'react'
import AdminCard from './AdminCard'
import Pagination from '../../reusable/Pagination/Pagination'
import { Button, Modal, Skeleton } from 'antd'
import Search from '../../reusable/Search/Search'
import AddAdminForm from '../../../pages/admin/AddAdminForm'

const AdminList = ({ Admins, setAdmins }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredAdmins, setFilteredAdmins] = useState(Admins)
    const [isOpen, setIsOpen] = useState(false)
    const AdminsPerPage = 8
    useEffect(() => {
        const filteredAdmins = Admins?.filter((admin) =>
            admin.username?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredAdmins(filteredAdmins)
        setCurrentPage(1)
    }, [searchTerm, Admins])

    const handleDelete = (id) => {
        const updatedAdmins = Admins?.filter((admin) => admin._id !== id)
        setAdmins(updatedAdmins)
    }

    const getCurrentAdmins = () => {
        if (!filteredAdmins)
            return (
                <div className='card'>
                    <Skeleton active />
                </div>
            )

        const indexOfLastadmin = currentPage * AdminsPerPage
        const indexOfFirstadmin = indexOfLastadmin - AdminsPerPage
        const currentAdmins = filteredAdmins.slice(
            indexOfFirstadmin,
            indexOfLastadmin
        )

        console.log('filteredAdmins', filteredAdmins)

        return currentAdmins.length
            ? currentAdmins.map((admin) => (
                  <AdminCard
                      key={admin}
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
        <section className='primary-container'>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                }}>
                <h2>Admins</h2>
                <Button
                    onClick={() => {
                        setIsOpen(true)
                    }}>
                    Add Admin
                </Button>
            </div>
            <Search onSearch={onSearch} placeholder={'username'} />
            <div className='card-list'>{getCurrentAdmins()}</div>
            <Pagination
                itemsPerPage={AdminsPerPage}
                totalItems={filteredAdmins?.length}
                paginate={(pageNumber) => setCurrentPage(pageNumber)}
                currentPage={currentPage}
            />
            <Modal
                title='Add Admin'
                open={isOpen}
                onOk={() => {
                    setIsOpen(false)
                }}
                onCancel={() => {
                    setIsOpen(false)
                }}
                footer={null}
                destroyOnClose>
                <AddAdminForm setAdmins={setAdmins} setIsOpen={setIsOpen} />
            </Modal>
        </section>
    )
}

export default AdminList
