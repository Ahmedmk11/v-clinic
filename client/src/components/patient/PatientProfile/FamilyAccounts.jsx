import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { LinkOutlined } from '@ant-design/icons'
import FamilyMemberCard from '../ViewFamily/FamilyMemberCard'
import axiosApi from '../../../utils/axiosApi'
import LinkFamily from './LinkFamily'
import SubscribeHealthPackage from './SubscribeHealthPackage'
const FamilyAccounts = ({ currUser, allPackages }) => {
    const [family, setFamily] = useState([])
    const [names, setNames] = useState([])
    const [linkFamilyModalOpen, setLinkFamilyModalOpen] = useState(false)
    const [subscribeModalOpen, setSubscribeModalOpen] = useState(false)

    useEffect(() => {
        const fetchFamily = async () => {
            try {
                if (currUser) {
                    console.log('currUser', currUser._id)
                    const res = await axiosApi.get(
                        `/patient/get-family/${currUser?._id}`
                    )
                    setFamily(res.data.familyMembers)
                    setNames(res.data.names)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchFamily()
    }, [currUser])

    return (
        <div className='sub-container'>
            <h2>My Family Accounts</h2>
            {family?.map((member,i) => (
                <FamilyMemberCard key={i+"fammem"} member={member} mode={'2'} />
            ))}
            <div
                style={{
                    width: '45%',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                <Button
                    onClick={() => {
                        setLinkFamilyModalOpen(true)
                    }}>
                    <LinkOutlined />
                    Link Family Member
                </Button>
                <Button
                    onClick={() => {
                        setSubscribeModalOpen(true)
                    }}>
                    Change Package of Family Member
                </Button>
            </div>
            <LinkFamily
                currUser={currUser}
                openFamilyModal={linkFamilyModalOpen}
                setOpenFamilyModal={setLinkFamilyModalOpen}
            />
            <SubscribeHealthPackage
                open={subscribeModalOpen}
                setOpen={setSubscribeModalOpen}
                allPackages={allPackages}
                targetSubscriberType={'family'}
                familyNames={names}
                familyMembers={family}
            />
        </div>
    )
}
export default FamilyAccounts
