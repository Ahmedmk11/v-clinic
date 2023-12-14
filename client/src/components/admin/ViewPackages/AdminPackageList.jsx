import { useEffect, useState } from 'react'
import AdminPackageCard from './AdminPackageCard'
import Pagination from '../../reusable/Pagination/Pagination'
import Search from '../../reusable/Search/Search'
import { Button, Modal,Skeleton } from 'antd'
import AddPackageForm from '../../../pages/admin/AddPackageForm'

const AdminPackageList = ({ Packages, setPackages }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredPackages, setFilteredPackages] = useState(Packages)
    const PackagesPerPage = 8
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const filteredPackages = Packages?.filter((Package) =>
            Package.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredPackages(filteredPackages)
        setCurrentPage(1)
    }, [searchTerm, Packages])

    const getCurrentPackages = () => {
        if (!filteredPackages)
            return (
                <div className='card'>
                    <Skeleton active />
                </div>
            )
        const indexOfLastPackage = currentPage * PackagesPerPage
        const indexOfFirstPackage = indexOfLastPackage - PackagesPerPage
        const currentPackages = filteredPackages.slice(
            indexOfFirstPackage,
            indexOfLastPackage
        )
        return currentPackages.length
            ? currentPackages.map((Package) => (
                  <AdminPackageCard key={Package._id} Package={Package} />
              ))
            : 'No Packages to show'
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
                <h2>Packages</h2>
                <Button
                    onClick={() => {
                        setIsOpen(true)
                    }}>
                    Add Package
                </Button>
            </div>
            <Search onSearch={onSearch} placeholder={'Package name'} />
            <div className='card-list'>{getCurrentPackages()}</div>
            <Pagination
                itemsPerPage={PackagesPerPage}
                totalItems={filteredPackages?.length}
                paginate={(pageNumber) => setCurrentPage(pageNumber)}
                currentPage={currentPage}
            />
            <Modal
                title='Add Package'
                open={isOpen}
                onOk={() => {
                    setIsOpen(false)
                }}
                onCancel={() => {
                    setIsOpen(false)
                }}
                footer={null}
                destroyOnClose>
                <AddPackageForm
                    setPackages={setPackages}
                    setIsOpen={setIsOpen}
                />
            </Modal>
        </section>
    )
}

export default AdminPackageList
