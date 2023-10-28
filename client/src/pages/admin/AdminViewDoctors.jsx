import { useEffect, useState } from "react"
import axios from 'axios'
import AdminDoctorList from "../../components/admin/AdminViewDoctor/AdminDoctorList"

const AdminViewDoctors = () => {
    const [doctors, setDoctors] = useState(null)
    useEffect(() => {
        fetchPatients()
    }, [])
    const fetchPatients = async () => {
        try {
            let res = await axios.get('http://localhost:3000/api/admin/getAllDoctors')
            if (res.length !== 0)
                setDoctors(res.data)
        } catch (error) {
            console.log(error)
        }
    } 
    return (
        <div className="page" >
            {doctors ? <AdminDoctorList doctors={doctors}/> : null}
        </div>
    )
}

export default AdminViewDoctors