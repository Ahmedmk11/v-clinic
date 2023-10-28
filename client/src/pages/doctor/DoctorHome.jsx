import { useContext, useState } from 'react'
import CurrUserContext from '../../contexts/CurrUser'
import StatusMessages from '../../components/doctor/DoctorHome/StatusMessages'

const DoctorHome = () => {
    const { currUser: Doctor } = useContext(CurrUserContext)
    
    return (
        <div className='page'>
            <StatusMessages Doctor={Doctor} />
        </div>
    )
}

export default DoctorHome
