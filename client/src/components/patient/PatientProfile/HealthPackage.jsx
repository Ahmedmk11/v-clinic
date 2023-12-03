import { useContext, useEffect, useState } from 'react'
import CurrUserContext from '../../../contexts/CurrUser'
import { Button, message } from 'antd'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import PackageInfo from './PackageInfo'
import SubscribeHealthPackage from './SubscribeHealthPackage'
import axiosApi from '../../../utils/axiosApi'
const HealthPackage = ({ allPackages }) => {
    const { currUser: patient, setCurrUser: setPatient } =
        useContext(CurrUserContext)
    const [open, setOpen] = useState(false)

    const handleCancelSubscirption = () => {
        axiosApi
            .post(`/patient/add-package/${patient?._id}`, {
                packageID: '-1',
            })
            .then((res) => {
                setPatient({ ...patient, package: res.data.package })
                message.success('Package cancelled successfully')
                setPatient({ ...patient, packageStatus: 'Inactive' })
            })
            .catch((err) => {
                message.error('Something went wrong')
                console.log(err)
            })
    }
    return (
        <div className='sub-container'>
            <h2>Health Package</h2>
            <ConditionalRender
                condition={patient?.package}
                elseComponent={
                    <p>You are not subscribed to any packages yet</p>
                }>
                <PackageInfo
                    renewalDate={patient?.packageRenewalDate}
                    healthPackage={patient?.package}
                    status={patient?.packageStatus}
                />
            </ConditionalRender>
            <ConditionalRender
                condition={
                    patient?.package && patient?.packageStatus == 'Inactive'
                }>
                <p style={{ fontSize: 11 }}>
                    *Your subscribtion will expire on{' '}
                    {new Date(patient?.packageRenewalDate).toDateString()}
                </p>
            </ConditionalRender>
            <ConditionalRender
                condition={
                    patient?.package && patient?.packageStatus == 'Active'
                }>
                <p style={{ fontSize: 11 }}>
                    *Your subscribtion will automatically renew on{' '}
                    {new Date(patient?.packageRenewalDate).toDateString()}
                </p>
            </ConditionalRender>
            <div className='edit-buttons'>
                <Button danger onClick={handleCancelSubscirption}>
                    Cancel Subscription
                </Button>
                <Button type='primary' onClick={() => setOpen(true)}>
                    {patient?.package ? 'Change Package' : 'Subscribe'}
                </Button>
            </div>
            <SubscribeHealthPackage
                open={open}
                setOpen={setOpen}
                allPackages={allPackages}
                targetSubscriberType='patient'
            />
        </div>
    )
}

export default HealthPackage
