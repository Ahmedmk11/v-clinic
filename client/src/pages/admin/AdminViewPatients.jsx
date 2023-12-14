import { useEffect, useState } from "react"
import AdminPatientList from '../../components/admin/AdminViewPatient/AdminPatientList'
import axiosApi from "../../utils/axiosApi"

const AdminViewPatients = () => {
    const [patients, setPatients] = useState(null)
    useEffect(() => {
        fetchPatients()
    }, [])
    const fetchPatients = async () => {
        try {
            let res = await axiosApi.get('/admin/getAllPatients')
            if (res.length !== 0)
                setPatients(res.data)
        } catch (error) {
            console.log(error)
        }
    } 
    return (
        <div className="page">
            <AdminPatientList patients={patients}/>
        </div>
    )
}

export default AdminViewPatients