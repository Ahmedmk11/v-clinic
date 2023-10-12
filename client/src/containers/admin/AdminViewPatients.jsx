import { useEffect, useState } from "react"
import axios from 'axios'
import AdminPatientList from '../../components/admin/AdminViewPatient/AdminPatientList'

const AdminViewPatients = () => {
    const [patients, setPatients] = useState(null)
    useEffect(() => {
        fetchPatients()
    }, [])
    const fetchPatients = async () => {
        try {
            let res = await axios.get('http://localhost:3000/api/admin/getAllPatients')
            if (res.length !== 0)
                setPatients(res.data)
        } catch (error) {
            console.log(error)
        }
    } 
    return (
        <div className="viewPatients-page">
            {patients ? <AdminPatientList patients={patients}/> : null}
        </div>
    )
}

export default AdminViewPatients