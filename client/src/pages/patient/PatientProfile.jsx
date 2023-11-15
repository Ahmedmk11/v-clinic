import React, { useContext, useState, useEffect } from 'react'
import axiosApi from '../../utils/axiosApi'
import CurrUserContext from '../../contexts/CurrUser'
import PatientInfo from '../../components/patient/PatientProfile/PatientInfo'
import HealthPackage from '../../components/patient/PatientProfile/HealthPackage'
import FamilyAccounts from '../../components/patient/PatientProfile/FamilyAccounts'
import { CloseOutlined } from '@ant-design/icons'
import ConditionalRender from '../../components/reusable/ConditionalRender/ConditionalRender'

const PatientProfile = () => {
    const { currUser } = useContext(CurrUserContext)
    const [allPackages, setAllPackages] = useState(null)
    const [show, setShow] = useState(false)

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

    useEffect(() => {
        if(currUser?.isAutoRenewalBlocked){
            setShow(true)
        }
    }
    , [currUser])

    const handleCancelAutoRenewal = () => {
        setShow(false)
        axiosApi.patch('/patient/cancelAutoRenewal', { patient_id: currUser._id }).then(
        ).catch((error) => {
            console.log(error)
        })
        
    }

    return (
        <div id='patient-profile-body' className='page'>
            <div className='primary-container'>
                <h2>Patient Profile</h2>
                <PatientInfo patient={currUser} />
                <ConditionalRender condition={show}>
                <div className='sub-container doctor-reminder'>
                    <div
                        className='close'
                        onClick={handleCancelAutoRenewal}>
                        <CloseOutlined />
                    </div>
                    <div>
                   Could not auto renew your health package, since wallet has no enough funds?
                </div>
                </div>
                </ConditionalRender>
                <HealthPackage allPackages={allPackages} />
                <FamilyAccounts currUser={currUser} allPackages={allPackages} />
            </div>
        </div>
    )
}

export default PatientProfile
