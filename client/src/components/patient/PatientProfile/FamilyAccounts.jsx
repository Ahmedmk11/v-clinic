import React, { useState, useEffect, useRef } from 'react'
import { Button, Modal } from 'antd'

import { LinkOutlined } from '@ant-design/icons'
import FamilyMemberCard from '../ViewFamily/FamilyMemberCard'
import axiosApi from '../../../utils/axiosApi'
import LinkFamily from './LinkFamily'
import SubscribeHealthPackage from './SubscribeHealthPackage'
import PatientRegistrationLogic from '../Register/PatientRegistrationLogic'
import { Skeleton } from 'antd'
const FamilyAccounts = ({ currUser, allPackages }) => {
    const [family, setFamily] = useState([])
    const [linkFamilyModalOpen, setLinkFamilyModalOpen] = useState(false)
    const [subscribeModalOpen, setSubscribeModalOpen] = useState(false)
    const [familyMemberProfiles, setFamilyMemberProfiles] = useState([])
    const [newAccountModalOpen, setNewAccountModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchFamily = async () => {
            try {
                if (currUser) {
                    const res = await axiosApi.get(
                        `/patient/get-family/${currUser?._id}`
                    )
                    setFamily(res.data.familyMembers)
                    setFamilyMemberProfiles(res.data.familyMemberProfiles)
                    setLoading(false)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchFamily()
    }, [currUser])

    return (
        <>
            <div className='sub-container'>
                <h2>My Family Accounts</h2>
                {loading ? (
                    <div className='member-card'>
                        <Skeleton active />{' '}
                    </div>
                ) : (
                    familyMemberProfiles?.map((member, i) => (
                        <FamilyMemberCard
                            key={i + 'fammem'}
                            member={member}
                            relation={
                                family.find((p) => member?._id == p.id)
                                    ?.relation
                            }
                            family={familyMemberProfiles}
                            setFamily={setFamilyMemberProfiles}
                        />
                    ))
                )}
                <div
                    className='edit-buttons'
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
                    <Button
                        type='primary'
                        onClick={() => {
                            setNewAccountModalOpen(true)
                        }}>
                        Create an account for a family member
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
            <Modal
                footer={null}
                width={600}
                title={`Create a Family Member's account`}
                onCancel={() => {
                    setNewAccountModalOpen(false)
                }}
                open={newAccountModalOpen}
                destroyOnClose>
                <PatientRegistrationLogic
                    mode={2}
                    setNewAccountModalOpen={setNewAccountModalOpen}
                    setFamily={setFamily}
                    setFamilyMemberProfiles={setFamilyMemberProfiles}
                />
            </Modal>
        </>
    )
}
export default FamilyAccounts
