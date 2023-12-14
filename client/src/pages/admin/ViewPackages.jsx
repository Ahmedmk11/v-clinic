import { useEffect, useState } from 'react'
import AdminPackageList from '../../components/admin/ViewPackages/AdminPackageList'
import axiosApi from '../../utils/axiosApi'

const ViewPackages = () => {
    const [Packages, setPackages] = useState(null)
    useEffect(() => {
        fetchPatients()
    }, [])
    const fetchPatients = async () => {
        try {
            let res = await axiosApi.get('/admin/getAllPackages')
            if (res.length !== 0) setPackages(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='page'>
     
                <AdminPackageList
                    Packages={Packages}
                    setPackages={setPackages}
                />
           
        </div>
    )
}

export default ViewPackages
