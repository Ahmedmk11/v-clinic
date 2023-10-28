import Search from '../../reusable/Search/Search'
import AntTable from './Table'
import { useState, useEffect } from 'react'

const RequestsTable = ({ requests, setRequests }) => {
    const [filteredRequests, setFilteredRequests] = useState(requests)
    const [searchTerm, setSearchTerm] = useState('')
    useEffect(() => {
        const searchRequests = requests.filter((doctor) =>
            doctor.username?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredRequests(searchRequests)
    }, [searchTerm, requests])
    return (
        <>
            <div className='primary-container requests-table-container'>
                <h2>Doctor Pending Requests</h2>
                <Search onSearch={setSearchTerm} placeholder={'username'} />
                <h4>Click + to show docs submitted with the request!</h4>
                <AntTable
                    requests={filteredRequests}
                    setRequests={setRequests}
                />
            </div>
        </>
    )
}

export default RequestsTable
