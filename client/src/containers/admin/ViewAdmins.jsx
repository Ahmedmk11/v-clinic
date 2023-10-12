import { useEffect, useState } from 'react'
import axios from 'axios'
import AdminList from '../../components/admin/ViewAdmins/AdminList'

const AdminViewAdmins = () => {
    const [Admins, setAdmins] = useState(null)
    useEffect(() => {
        fetchPatients()
    }, [])
    const fetchPatients = async () => {
        try {
            let res = await axios.get(
                'http://localhost:3000/api/admin/getAllAdmins'
            )
            if (res.length !== 0) setAdmins(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='viewPatients-page'>
            {Admins ? (
                <AdminList Admins={Admins} setAdmins={setAdmins} />
            ) : null}
        </div>
    )
}

export default AdminViewAdmins
