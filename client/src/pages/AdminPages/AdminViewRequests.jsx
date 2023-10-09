import RequestsTable from '../../components/AdminComponents/Admin Doctor Requests/RequestsTable.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
const AdminViewRequests = () => {
    const [requests, setRequests] = useState([])
    useEffect(() => {
        axios
            .get('http://localhost:3000/api/admin/getAllDoctorRequest')
            .then((res) => {
                setRequests(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className='requests-table-page'>
            <RequestsTable requests={requests} setRequests={setRequests} />
        </div>
    )
}

export default AdminViewRequests
