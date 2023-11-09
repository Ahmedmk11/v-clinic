import React, { useContext, useState, useEffect } from 'react'
import axiosApi from '../../utils/axiosApi'
import CurrUserContext from '../../contexts/CurrUser'
import PatientInfo from '../../components/patient/PatientProfile/PatientInfo'
import HealthPackage from '../../components/patient/PatientProfile/HealthPackage'
import AddFamily from './AddFamily'
import FamilyAccounts from '../../components/patient/PatientProfile/FamilyAccounts'

const PatientProfile = () => {
    const { currUser } = useContext(CurrUserContext)
    const [allPackages, setAllPackages] = useState(null)

    useEffect(() => {
        axiosApi
            .get('/admin/getAllPackages')
            .then((response) => {
                setAllPackages(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])
    return (
        <div id='patient-profile-body' className='page'>
            <div className='primary-container'>
                <h2>Patient Profile</h2>
                <PatientInfo patient={currUser} />
                <HealthPackage allPackages={allPackages} />
                <FamilyAccounts currUser={currUser} allPackages={allPackages} />
                <AddFamily />
            </div>
        </div>
    )
}

export default PatientProfile
