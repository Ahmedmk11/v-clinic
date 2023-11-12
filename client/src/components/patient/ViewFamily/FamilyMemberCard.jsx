import { useEffect, useState } from 'react'
import './familyMemberCard.css'
import axiosApi from '../../../utils/axiosApi'
import { Button } from 'antd'

const FamilyMemberCard = ({ member, mode, relation }) => {
    const handleCancelSubscirption = () => {
        axiosApi
            .post(`/patient/add-package/${member?.id}`, {
                packageID: '-1',
            })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className='card'>
            <div>
                <>
                    <div>
                        <strong>Name: </strong> {member?.name}
                    </div>
                    <div>
                        <strong>Email: </strong> {member?.email}
                    </div>
                    <div>
                        <strong>Phone Number: </strong> {member?.phoneNumber}
                    </div>
                    <div>
                        <strong>Relation: </strong> {relation}
                    </div>
                    <div>
                        <strong>Package: </strong>{' '}
                        {member?.package?.name ?? 'Not subscribed to a package'}
                    </div>
                    <Button danger onClick={handleCancelSubscirption}>
                        Cancel Subscription
                    </Button>
                </>
            </div>
        </div>
    )
}

export default FamilyMemberCard
