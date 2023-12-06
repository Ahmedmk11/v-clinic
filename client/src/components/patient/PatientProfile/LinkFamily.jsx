import React, { useState } from 'react'
import { Modal, Form, Input, Select, Checkbox } from 'antd'
import axiosApi from '../../../utils/axiosApi'
const { Option } = Select
const LinkFamilyMember = ({
    currUser,
    openFamilyModal,
    setOpenFamilyModal,
}) => {
    const [confirmFamilyLoading, setConfirmFamilyLoading] = useState(false)
    const [familyMemberEmail, setFamilyMemberEmail] = useState('')
    const [familyMemberPhone, setFamilyMemberPhone] = useState('')
    const [familyMemberRelation, setFamilyMemberRelation] = useState('')
    const [familyLinkingCode, setFamilyLinkingCode] = useState('')
    const [useEmail, setUseEmail] = useState(true)

    const [formFamilyRef] = Form.useForm()
    const handleFamilyOk = async () => {
        try {
            setConfirmFamilyLoading(true)

            if (formFamilyRef.current) {
                await formFamilyRef.current.validateFields()

                await axiosApi.post(`/patient/add-to-family/${currUser?._id}`, {
                    gender: currUser?.gender,
                    email: useEmail ? familyMemberEmail : '',
                    phoneNumber: useEmail ? '' : familyMemberPhone,
                    relation: familyMemberRelation,
                    linkingCode: familyLinkingCode,
                })
            }

            setOpenFamilyModal(false)
            setConfirmFamilyLoading(false)
        } catch (error) {
            console.error('add to family error:', error)
            setConfirmFamilyLoading(false)
        }
    }

    const handleFamilyCancel = () => {
        setOpenFamilyModal(false)
        setFamilyMemberEmail('')
        setFamilyMemberPhone('')
        setFamilyMemberRelation('')
        setFamilyLinkingCode('')
        setUseEmail(true)
    }
    return (
        <Modal
            width={500}
            title='Link Family Member'
            open={openFamilyModal}
            onOk={handleFamilyOk}
            okText='Link'
            confirmLoading={confirmFamilyLoading}
            onCancel={handleFamilyCancel}
            destroyOnClose>
            <Form
                ref={formFamilyRef}
                name='add-family-member-form'
                onFinish={handleFamilyOk}
                layout='vertical'>
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
                        defaultValue={'Relation'}
                        onChange={(value) => {
                            setFamilyMemberRelation(value)
                        }}
                        placeholder='Select relation'>
                        <Option value='Wife'>Wife</Option>
                        <Option value='Husband'>Husband</Option>
                        <Option value='Child'>Child</Option>
                    </Select>
                </Form.Item>
                {useEmail ? (
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
                ) : (
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
                )}
                <Form.Item
                    label={`Family Member's Linking Code`}
                    name='linkingCode'
                    rules={[
                        {
                            required: true,
                            message:
                                'Please enter the linking code of the patient you want to link with, ask them to share it with you!',
                        },
                    ]}>
                    <Input
                        value={familyLinkingCode}
                        placeholder='Linking Code'
                        onChange={(e) => {
                            setFamilyLinkingCode(e.target.value)
                        }}
                    />
                </Form.Item>
                <Checkbox
                    className='login-text'
                    onChange={(e) => {
                        setUseEmail(!e.target.checked)
                    }}>
                    Use their phone number instead?
                </Checkbox>
            </Form>
        </Modal>
    )
}
export default LinkFamilyMember
