import { useContext } from 'react'
import CurrUserContext from '../../contexts/CurrUser'
import StatusMessages from '../../components/doctor/DoctorHome/StatusMessages'
import Dashboard from '../../components/doctor/DoctorDashboard/Dashboard'

const DoctorHome = () => {
    const { currUser: Doctor } = useContext(CurrUserContext)

    return (
        <div className='page'>
            <div className='primary-container'>
                <h2>Home</h2>
                <StatusMessages Doctor={Doctor} />
                <Dashboard />
            </div>
        </div>
    )
}

export default DoctorHome
