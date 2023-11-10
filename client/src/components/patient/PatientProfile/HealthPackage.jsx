import { useContext, useEffect, useState } from 'react'
import CurrUserContext from '../../../contexts/CurrUser'
import { Button } from 'antd'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import PackageInfo from './PackageInfo'
import SubscribeHealthPackage from './SubscribeHealthPackage'
import axiosApi from '../../../utils/axiosApi'
const HealthPackage = ({allPackages}) => {
    const { currUser: patient, setCurrUser: setPatient } =
        useContext(CurrUserContext)
    const [open, setOpen] = useState(false)

    const handleCancelSubscirption = () => {
        axiosApi.post(`/patient/add-package/${patient?._id}`, {
            packageID: '-1'
    })
    .then((res) => {
        console.log(res)
    })
    .catch((err) => console.log(err))
    }

    return (
        <div className='sub-container'>
            <h2>Health Package</h2>
            <ConditionalRender
                condition={patient?.package}
                elseComponent={
                    <p>You are not subscribed to any packages yet</p>
                }>
                <PackageInfo healthPackage={patient?.package} />
            </ConditionalRender>
            <div className='edit-buttons'>
                <Button type='primary' onClick={() => setOpen(true)}>
                    {patient?.package ? 'Change Package' : 'Subscribe'}
                </Button>
                <Button danger onClick={handleCancelSubscirption}>
                    Cancel Subscription
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
