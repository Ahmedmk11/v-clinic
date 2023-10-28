import RequestsTable from '../../components/admin/ViewDoctorRequests/RequestsTable.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './css/ViewRequests.css'
const ViewRequests = () => {
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
        <div className='page'>
            <RequestsTable requests={requests} setRequests={setRequests} />
        </div>
    )
}

export default ViewRequests
