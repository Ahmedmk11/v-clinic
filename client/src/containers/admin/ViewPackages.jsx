import { useEffect, useState } from 'react'
import axios from 'axios'
import AdminPackageList from '../../components/admin/ViewPackages/AdminPackageList'

const AdminViewPackages = () => {
    const [Packages, setPackages] = useState(null)
    useEffect(() => {
        fetchPatients()
    }, [])
    const fetchPatients = async () => {
        try {
            let res = await axios.get(
                'http://localhost:3000/api/admin/getAllPackages'
            )
            if (res.length !== 0) setPackages(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='viewPatients-page'>
            {Packages ? (
                <AdminPackageList Packages={Packages}  />
            ) : null}
        </div>
    )
}

export default AdminViewPackages
