import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { LinkOutlined } from '@ant-design/icons'
import FamilyMemberCard from '../ViewFamily/FamilyMemberCard'
import axiosApi from '../../../utils/axiosApi'
import LinkFamily from './LinkFamily'
import SubscribeHealthPackage from './SubscribeHealthPackage'
const FamilyAccounts = ({ currUser, allPackages }) => {
    const [family, setFamily] = useState([])
    const [linkFamilyModalOpen, setLinkFamilyModalOpen] = useState(false)
    const [subscribeModalOpen, setSubscribeModalOpen] = useState(false)
    const [familyMemberProfiles, setFamilyMemberProfiles] = useState([])

    useEffect(() => {
        const fetchFamily = async () => {
            try {
                if (currUser) {
                    console.log('currUser', currUser._id)
                    const res = await axiosApi.get(
                        `/patient/get-family/${currUser?._id}`
                    )
                    setFamily(res.data.familyMembers)
                    setFamilyMemberProfiles(res.data.familyMemberProfiles)
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
            {familyMemberProfiles?.map((member,i) => (
                <FamilyMemberCard key={i+"fammem"} member={member} relation={family.find((p)=>member._id==p.id)?.relation} mode={'2'} />
            ))}
            <div className='edit-buttons'
                style={{
                    // width: '45%',
                    // display: 'flex',
                    // justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    
                }}>
                <Button
                    type='primary'
                    onClick={() => {
                        setLinkFamilyModalOpen(true)
                    }}>
                    <LinkOutlined />
                    Link Family Member
                </Button>
                <Button
                type='primary'
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
                familyMemberProfiles={familyMemberProfiles}
                setFamilyMemberProfiles={setFamilyMemberProfiles}
            />
        </div>
    )
}
export default FamilyAccounts
