import React, { useState, useEffect, useRef } from 'react'
import { Button, Modal, Form, Select, Input, DatePicker, message } from 'antd'

const { Option } = Select

import { LinkOutlined } from '@ant-design/icons'
import FamilyMemberCard from '../ViewFamily/FamilyMemberCard'
import axiosApi from '../../../utils/axiosApi'
import LinkFamily from './LinkFamily'
import SubscribeHealthPackage from './SubscribeHealthPackage'
const FamilyAccounts = ({ currUser, allPackages }) => {
    const formRef = useRef(null)

    const [family, setFamily] = useState([])
    const [createdPatient, setCreatedPatient] = useState([])
    const [linkFamilyModalOpen, setLinkFamilyModalOpen] = useState(false)
    const [subscribeModalOpen, setSubscribeModalOpen] = useState(false)
    const [familyMemberProfiles, setFamilyMemberProfiles] = useState([])
    const [newAccountModalOpen, setNewAccountModalOpen] = useState(false)

    const [familyMemberUsername, setFamilyMemberUsername] = useState('')
    const [familyMemberName, setFamilyMemberName] = useState('')
    const [familyMemberEmail, setFamilyMemberEmail] = useState('')
    const [familyMemberPassword, setFamilyMemberPassword] = useState('')
    const [familyMemberNid, setFamilyMemberNid] = useState('')
    const [familyMemberBirthdate, setFamilyMemberBirthdate] = useState('')
    const [familyMemberGender, setFamilyMemberGender] = useState('')
    const [familyMemberPhone, setFamilyMemberPhone] = useState('')
    const [familyMemberEmergencyName, setFamilyMemberEmergencyName] =
        useState('')
    const [familyMemberEmergencyPhone, setFamilyMemberEmergencyPhone] =
        useState('')
    const [familyMemberRelation, setFamilyMemberRelation] = useState('')

    const [confirmLoading, setConfirmLoading] = useState(false)

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

        setFamilyMemberEmergencyName(currUser?.emergencyName)
        setFamilyMemberEmergencyPhone(currUser?.emergencyPhoneNumber)
    }, [currUser])

    const createFamilyMember = async () => {
        // create a patient account
        const familyMemberBirthdateMongo = new Date(
            familyMemberBirthdate.toISOString()
        )
        try {
            if (formRef.current) {
                let res1 = await axiosApi.post(`/patient/create-patient`, {
                    username: familyMemberUsername,
                    name: familyMemberName,
                    email: familyMemberEmail,
                    password: familyMemberPassword,
                    nid: familyMemberNid,
                    birthdate: familyMemberBirthdateMongo,
                    gender: familyMemberGender,
                    phoneNumber: familyMemberPhone,
                    emergencyName: familyMemberEmergencyName,
                    emergencyPhoneNumber: familyMemberEmergencyPhone,
                    package: '',
                    health_records: '',
                })

                setCreatedPatient(res1.data)

                await axiosApi.post(`/patient/add-to-family/${currUser?._id}`, {
                    gender: familyMemberGender,
                    email: familyMemberEmail,
                    phoneNumber: familyMemberPhone,
                    relation: familyMemberRelation,
                    linkingCode: res1.data.linkingCode,
                })
                const res2 = await axiosApi.get(
                    `/patient/get-family/${currUser?._id}`
                )
                setFamily(res2.data.familyMembers)
                setFamilyMemberProfiles(res2.data.familyMemberProfiles)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleOk = async () => {
        if (formRef.current) {
            setConfirmLoading(true)
            await createFamilyMember()
            setConfirmLoading(false)
            message.success('Family member account created successfully!')
            setNewAccountModalOpen(false)
        }
    }

    const handleCancel = () => {
        setNewAccountModalOpen(false)
    }

    return (
        <>
            <div className='sub-container'>
                <h2>My Family Accounts</h2>
                {familyMemberProfiles?.map((member, i) => (
                    <FamilyMemberCard
                        key={i + 'fammem'}
                        member={member}
                        relation={
                            family.find((p) => member?._id == p.id)?.relation
                        }
                        family={family}
                    />
                ))}
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
                title='Add New Family Member'
                open={newAccountModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
                destroyOnClose>
                <Form ref={formRef} layout='vertical'>
                    <Form.Item
                        label='Relation'
                        name='relation'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please enter your relation with the family member!',
                            },
                        ]}>
                        <Select
                            value={familyMemberRelation}
                            onChange={(value) => {
                                setFamilyMemberRelation(value)
                            }}
                            placeholder='Select relation'>
                            <Option value='Wife'>Wife</Option>
                            <Option value='Husband'>Husband</Option>
                            <Option value='Child'>Child</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={`Family Member's username`}
                        name='familyMemberUsername'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please enter the username of the patient you want to link with!',
                            },
                        ]}>
                        <Input
                            value={familyMemberUsername}
                            placeholder='Username'
                            onChange={(e) => {
                                setFamilyMemberUsername(e.target.value)
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={`Family Member's Name`}
                        name='familyMemberName'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please enter the name of the patient you want to link with!',
                            },
                        ]}>
                        <Input
                            value={familyMemberName}
                            placeholder='Name'
                            onChange={(e) => {
                                setFamilyMemberName(e.target.value)
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={`Family Member's Password`}
                        name='familyMemberPassword'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please enter the password of the patient you want to link with!',
                            },
                        ]}>
                        <Input
                            value={familyMemberPassword}
                            placeholder='Password'
                            onChange={(e) => {
                                setFamilyMemberPassword(e.target.value)
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={`Family Member's Email`}
                        name='familyMemberEmail'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please enter the email of the patient you want to link with!',
                            },
                        ]}>
                        <Input
                            value={familyMemberEmail}
                            placeholder='Email'
                            onChange={(e) => {
                                setFamilyMemberEmail(e.target.value)
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={`Family Member's Phone Number`}
                        name='familyMemberNumber'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please enter the phone number of the patient you want to link with!',
                            },
                        ]}>
                        <Input
                            value={familyMemberPhone}
                            placeholder='Phone Number'
                            onChange={(e) => {
                                setFamilyMemberPhone(e.target.value)
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={`Family Member's National ID`}
                        name='familyMemberNid'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please enter the national ID of the patient you want to link with!',
                            },
                        ]}>
                        <Input
                            value={familyMemberNid}
                            placeholder='National ID'
                            onChange={(e) => {
                                setFamilyMemberNid(e.target.value)
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={`Family Member's Date of Birth`}
                        name='familyMemberBirthdate'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please enter the date of birth of the patient you want to link with!',
                            },
                        ]}>
                        <DatePicker
                            value={familyMemberBirthdate}
                            onChange={(date) => {
                                setFamilyMemberBirthdate(date)
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={`Family Member's Gender`}
                        name={familyMemberGender}
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please enter the date of birth of the patient you want to link with!',
                            },
                        ]}>
                        <Select
                            value={familyMemberGender}
                            onChange={(value) => {
                                setFamilyMemberGender(value)
                            }}
                            placeholder='Select gender'>
                            <Option value='male'>Male</Option>
                            <Option value='female'>Female</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default FamilyAccounts
