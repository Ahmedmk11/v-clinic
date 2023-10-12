import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Form, Input, Select, Button, message } from 'antd'
import './familyMembers.css'
import FamilyMemberCard from '../FamilyMemberCard/FamilyMemberCard'

const { Option } = Select

const FamilyMembers = ({ id }) => {
    const [familyMembers, setFamilyMembers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [fmName, setFmName] = useState('')
    const [fmNID, setFmNID] = useState('')
    const [fmGender, setFmGender] = useState('')
    const [fmAge, setFmAge] = useState('')
    const [fmRelation, setFmRelation] = useState('')

    const [fmNameError, setFmNameError] = useState('')
    const [fmNIDError, setFmNIDError] = useState('')
    const [fmAgeError, setFmAgeError] = useState('')
    const [fmGenderError, setFmGenderError] = useState('')
    const [fmRelationError, setFmRelationError] = useState('')

    const [errorDisplay1, setErrorDisplay1] = useState(false)
    const [errorDisplay2, setErrorDisplay2] = useState(false)
    const [errorDisplay3, setErrorDisplay3] = useState(false)
    const [errorDisplay4, setErrorDisplay4] = useState(false)
    const [errorDisplay5, setErrorDisplay5] = useState(false)

    const [hasErrors, setHasErrors] = useState(false)

    useEffect(() => {
        axios
            .get(
                `http://localhost:3000/api/patient/get-patient-family-members/${id}`
            )
            .then((res) => {
                setFamilyMembers(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        setHasErrors(validateForm())
    }, [
        fmName,
        fmNID,
        fmGender,
        fmAge,
        fmRelation,
        fmNameError,
        fmNIDError,
        fmGenderError,
        fmAgeError,
        fmRelationError,
    ])

    const validateForm = () => {
        let hasErrors = false

        if (fmName.length < 3) {
            setFmNameError(
                'Please enter a username that is 3 characters or longer'
            )
            hasErrors = true
        } else if (!/^[A-Za-z\s]+$/.test(fmName)) {
            setFmNameError('Name must contain only letters and spaces')
            hasErrors = true
        } else {
            setFmNameError('')
        }

        if (!/^[0-9]+$/.test(fmNID)) {
            setFmNIDError('National ID must contain only numbers')
            hasErrors = true
        } else if (fmNID.length !== 14) {
            setFmNIDError('National ID must be 14 characters long')
            hasErrors = true
        } else {
            setFmNIDError('')
        }

        if (fmAge < 0 || fmAge > 120) {
            setFmAgeError('Please enter a valid age')
            hasErrors = true
        } else {
            setFmAgeError('')
        }

        if (!fmGender) {
            setFmGenderError('Gender must be selected')
            hasErrors = true
        } else {
            setFmGenderError('')
        }

        if (!fmRelation) {
            setFmRelationError('Relation must be selected')
            hasErrors = true
        } else {
            setFmRelationError('')
        }

        return hasErrors
    }

    useEffect(() => {
        console.log(fmGender, fmRelation)
    }, [fmGender, fmRelation])

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setErrorDisplay1(true)
        setErrorDisplay2(true)
        setErrorDisplay3(true)
        setErrorDisplay4(true)
        setErrorDisplay5(true)
        if (!hasErrors) {
            setIsModalOpen(false)
            handleAddFamilyMember()
            message.success('Family member added successfully!')
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setFmName('')
        setFmNID('')
        setFmGender('')
        setFmAge('')
        setFmRelation('')
        setFmNameError('')
        setFmNIDError('')
        setFmAgeError('')
        setFmGenderError('')
        setFmRelationError('')
        setErrorDisplay1(false)
        setErrorDisplay2(false)
        setErrorDisplay3(false)
        setErrorDisplay4(false)
        setErrorDisplay5(false)
    }

    const handleAddFamilyMember = () => {
        axios
            .post(
                `http://localhost:3000/api/patient/populate-family-members/${id}`,
                {
                    name: fmName,
                    patient_id: id,
                    national_id: fmNID,
                    gender: fmGender,
                    age: fmAge,
                    relation: fmRelation,
                }
            )
            .then((res) => {
                setFamilyMembers(res.data)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div id='family-members-container'>
            <h2>Family Members</h2>
            <Button onClick={showModal}>Add New Family Member</Button>
            <div id='family-members-content'>
                {familyMembers.map((member) => (
                    <FamilyMemberCard member={member} />
                ))}
            </div>

            <Modal
                title='Add New Family Member'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose>
                <Form>
                    <Form.Item label='Name'>
                        <Input
                            value={fmName}
                            onChange={(e) => {
                                setFmName(e.target.value)
                                setErrorDisplay1(true)
                            }}
                            placeholder='Enter name'
                        />
                        {errorDisplay1 && fmNameError && (
                            <p style={{ color: 'red' }}>{fmNameError}</p>
                        )}
                    </Form.Item>
                    <Form.Item label='National ID'>
                        <Input
                            value={fmNID}
                            onChange={(e) => {
                                setFmNID(e.target.value)
                                setErrorDisplay2(true)
                            }}
                            placeholder='Enter national ID'
                        />
                        {errorDisplay2 && fmNIDError && (
                            <p style={{ color: 'red' }}>{fmNIDError}</p>
                        )}
                    </Form.Item>
                    <Form.Item label='Gender'>
                        <Select
                            defaultValue={'Select gender'}
                            onChange={(value) => {
                                setFmGender(value)
                            }}
                            placeholder='Gender'>
                            <Option value='Male'>Male</Option>
                            <Option value='Female'>Female</Option>
                        </Select>
                        {errorDisplay3 && fmGenderError && (
                            <p style={{ color: 'red' }}>{fmGenderError}</p>
                        )}
                    </Form.Item>
                    <Form.Item label='Age'>
                        <Input
                            value={fmAge}
                            onChange={(e) => {
                                setFmAge(e.target.value)
                                setErrorDisplay4(true)
                            }}
                            placeholder='Enter age'
                        />
                        {errorDisplay4 && fmAgeError && (
                            <p style={{ color: 'red' }}>{fmAgeError}</p>
                        )}
                    </Form.Item>
                    <Form.Item label='Relation'>
                        <Select
                            defaultValue={'Relation'}
                            onChange={(value) => {
                                setFmRelation(value)
                            }}
                            placeholder='Select relation'>
                            <Option value='Wife'>Wife</Option>
                            <Option value='Husband'>Husband</Option>
                            <Option value='Child'>Child</Option>
                        </Select>
                        {errorDisplay5 && fmRelationError && (
                            <p style={{ color: 'red' }}>{fmRelationError}</p>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default FamilyMembers
