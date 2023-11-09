import RequestsTable from '../../components/admin/ViewDoctorRequests/RequestsTable.jsx'
import { useEffect, useState } from 'react'
import './css/ViewRequests.css'
import axiosApi from '../../utils/axiosApi.js'
const ViewRequests = () => {
    const [requests, setRequests] = useState([])
    useEffect(() => {
        axiosApi
            .get('/admin/getAllDoctorRequest')
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
