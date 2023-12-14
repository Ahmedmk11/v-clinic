import { useEffect, useState } from 'react'
import AdminDoctorList from '../../components/admin/AdminViewDoctor/AdminDoctorList'
import axiosApi from '../../utils/axiosApi'

const AdminViewDoctors = () => {
    const [doctors, setDoctors] = useState(null)

    useEffect(() => {
        fetchPatients()
    }, [])
    const fetchPatients = async () => {
        try {
            let res = await axiosApi.get('/admin/getAllDoctors')
            if (res.length !== 0) setDoctors(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='page'>
           <AdminDoctorList doctors={doctors} />
        </div>
    )
}

export default AdminViewDoctors
