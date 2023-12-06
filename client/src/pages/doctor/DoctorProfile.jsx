import './css/doctorProfile.css'
import doctorImg from '../../assets/imgs/doctorProfile.png'
import { useState, useContext, useEffect, useRef } from 'react'
import { Button, Modal, Form, Input, Alert } from 'antd'
import CurrUserContext from '../../contexts/CurrUser'
import RequireDocs from '../../components/doctor/DoctorProfile/RequireDocs'
import DoctorCalender from '../../components/doctor/DoctorProfile/DoctorCalender'
import ConditionalRender from '../../components/reusable/ConditionalRender/ConditionalRender'
import axiosApi ,{baseURL}from '../../utils/axiosApi'
import ImageGallery from '../../components/reusable/ImageGallery/ImageGallery'

const DoctorProfile = () => {
    const {
        currUser,
        setCurrUser: setDoctor,
        role,
    } = useContext(CurrUserContext)

    const [DoctorInfo, setDoctorInfo] = useState({})
    const [EditMessage, setEditMessage] = useState('')
    const [EditMode, setEditMode] = useState(false)
    const [SaveButtonClicked, setSaveButtonClicked] = useState(false)
    const formRef = useRef(null)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const showModal = () => {
        setOpen(true)
    }

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

    const handleInputChange = (e, changedField) => {
        setDoctorInfo({ ...DoctorInfo, [changedField]: e.target.value })
    }

    useEffect(() => {
        setDoctorInfo(currUser)
    }, [currUser])

    const getDoctorData = (key, fieldType, representativeKey) => {
        return (
            currUser && (
                <li>
                    <strong>{representativeKey}: </strong>
                    {EditMode && key !== 'education' ? (
                        <input
                            type={fieldType}
                            value={DoctorInfo[key]}
                            onChange={(e) => {
                                handleInputChange(e, key)
                            }}
                        />
                    ) : key === 'email' ? (
                        <a>{currUser[key]}</a>
                    ) : (
                        currUser[key]
                    )}
                </li>
            )
        )
    }

    const getButtons = () => {
        return EditMode ? (
            <div className='edit-buttons'>
                <Button
                    size='large'
                    onClick={() => {
                        setEditMode(false)
                        setDoctorInfo(currUser)
                        setEditMessage('canceled')
                        setTimeout(() => setEditMessage(''), 5000)
                    }}>
                    Cancel
                </Button>
                <Button
                    type='primary'
                    size='large'
                    disabled={SaveButtonClicked}
                    onClick={handleSave}>
                    Save
                </Button>
            </div>
        ) : (
            <div className='edit-buttons'>
                <Button
                    type='primary'
                    size='large'
                    onClick={() => {
                        setEditMode(true)
                        setEditMessage('')
                    }}>
                    Edit Profile
                </Button>
                <Button type='primary' size='large' onClick={showModal}>
                    Change Password
                </Button>
            </div>
        )
    }

    const handleSave = async () => {
        setSaveButtonClicked(true)
        try {
            await axiosApi.put(`/doctor/update-doctor`, DoctorInfo)
            setDoctor(DoctorInfo)
            setEditMode(false)
            setEditMessage('success')
            setSaveButtonClicked(false)
        } catch (err) {
            setEditMessage('failed')
        } finally {
            setTimeout(() => {
                setEditMessage('')
                setSaveButtonClicked(false)
            }, 5000)
        }
    }

    const getDoctorInfo = () => {
        return (
            <>
                <h2 style={{ marginBottom: '0px' }}>My Info</h2>
                {EditMessage === 'success' && (
                    <Alert
                        message='Saved successfully'
                        type='success'
                        showIcon
                        closable
                    />
                )}
                {EditMessage === 'failed' && (
                    <Alert
                        message='Could not save. Please try again later.'
                        type='error'
                        showIcon
                        closable
                    />
                )}
                {EditMessage === 'canceled' && (
                    <Alert
                        message='Did not save any changes.'
                        type='info'
                        showIcon
                        closable
                    />
                )}
                <ul>
                    {getDoctorData('education', 'text', 'Education')}
                    {getDoctorData('email', 'email', 'Email')}
                    {getDoctorData('hourly_rate', 'number', 'Hourly Rate')}
                    {getDoctorData('affiliation', 'text', 'Affiliation')}
                    {getDoctorData('speciality', 'text', 'Speciality')}
                </ul>
                {getButtons()}
            </>
        )
    }

    return (
        <div className='page'>
            <div className='primary-container'>
                <div className='doctor-name-img'>
                    <img src={doctorImg} alt='Profile Image' />
                    <section>
                        <h2>Dr. {currUser?.name}</h2>
                        <p>
                            <strong>Status: </strong>
                            <span className={currUser?.status}>
                                {' '}
                                {currUser?.status}{' '}
                            </span>
                        </p>
                    </section>
                </div>
                <RequireDocs
                    docs={currUser?.uploaded_documents}
                    status={currUser?.status}
                    children={ <div className='doctor-info-container'>{getDoctorInfo()}</div>}
                />
               
                <ConditionalRender
                    condition={currUser?.contract_acceptance == 'Accepted'}>
                    <DoctorCalender />
                </ConditionalRender>
                <ConditionalRender condition={currUser?.status?.toLowerCase() == 'active'}>
                <div className='sub-container'>
                    <h2>Uploaded Documents</h2>
                    <ImageGallery
                        images={currUser?.uploaded_documents?.map((url) => baseURL + url)}
                    />
                </div>
            </ConditionalRender>
            </div>
            <Modal
                title='Change Password'
                open={open}
                onOk={handleOk}
                okText='Save'
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                destroyOnClose>
                <Form
                    ref={formRef}
                    name='password-change-form'
                    onFinish={handleOk}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}>
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
        </div>
    )
}

export default DoctorProfile
