import React, { useState, useRef, useContext } from 'react'
import { Modal, Form, Input } from 'antd'
import axiosApi from '../../../utils/axiosApi'
import CurrUserContext from '../../../contexts/CurrUser'
const ChangePassword = ({ open, setOpen }) => {
    const { currUser, role } = useContext(CurrUserContext)
    const formRef = useRef(null)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmLoading, setConfirmLoading] = useState(false)

    const handleOk = async () => {
        try {
            setConfirmLoading(true)

            if (formRef.current) {
                await formRef.current.validateFields()

                await axiosApi.put(`/auth/change-password`, {
                    id: currUser._id,
                    role: role,
                    oldPassword,
                    newPassword,
                })
            }

            setOpen(false)
            setConfirmLoading(false)
        } catch (error) {
            console.error('Form submission error:', error)
            setConfirmLoading(false)
        }
    }

    const handleCancel = () => {
        setOpen(false)
        setOldPassword('')
        setNewPassword('')
        setConfirmLoading(false)
    }
    return (
        <Modal
            key='passwordModal'
            title='Change Password'
            open={open}
            onOk={handleOk}
            okText='Save'
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            cancelButtonProps={{ danger: true }}
            destroyOnClose>
            <Form
                ref={formRef}
                name='password-change-form'
                onFinish={handleOk}
                layout='vertical'>
                <Form.Item
                    label='Old Password'
                    name='oldPassword'
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your old password!',
                        },
                    ]}>
                    <Input.Password
                        value={oldPassword}
                        placeholder='Current Password'
                        onChange={(e) => {
                            setOldPassword(e.target.value)
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label='New Password'
                    name='newPassword'
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your new password!',
                        },
                    ]}>
                    <Input.Password
                        value={newPassword}
                        placeholder='New Password'
                        onChange={(e) => {
                            setNewPassword(e.target.value)
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label='Confirm New Password'
                    name='confirmPassword'
                    dependencies={['newPassword']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your new password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue('newPassword') === value
                                ) {
                                    // eslint-disable-next-line no-undef
                                    return Promise.resolve()
                                }
                                // eslint-disable-next-line no-undef
                                return Promise.reject(
                                    'The two passwords do not match!'
                                )
                            },
                        }),
                    ]}>
                    <Input.Password placeholder='Confirm New Password' />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default ChangePassword
