import './css/ViewDoctors.css'

import { useState, useContext, useRef, useEffect } from 'react'
import CurrUserContext from '../../contexts/CurrUser'
import ViewFamily from './ViewFamily'
import {
    Button,
    Modal,
    Form,
    Input,
    Space,
    Select,
    Dropdown,
    Menu,
    message,
} from 'antd'
import { InfoCircleOutlined, LinkOutlined } from '@ant-design/icons'
import FamilyMemberCard from '../../components/patient/ViewFamily/FamilyMemberCard'

import axios from 'axios'

const PatientProfile = () => {
    const formRef = useRef(null)

    const { currUser, role } = useContext(CurrUserContext)

    const [currUserPackageName, setCurrUserPackageName] = useState(null)

    const [allPackages, setAllPackages] = useState([])

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [open, setOpen] = useState(false)
    const [packageOpen, setPackageOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [confirmPackageLoading, setConfirmPackageLoading] = useState(false)

    const [selectedPackage, setSelectedPackage] = useState('-1')

    useEffect(() => {
        console.log('selectedPackage', selectedPackage)
    }, [selectedPackage])

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                if (currUser) {
                    const res = await axios.get(
                        `http://localhost:3000/api/admin/getPackage/${currUser?.package}`,
                        {
                            withCredentials: true,
                        }
                    )
                    setCurrUserPackageName(res.data.name)
                    setSelectedPackage(
                        currUser?.package == null ? '-1' : currUser?.package
                    )
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchPackage()
    }, [currUser])

    const items = allPackages.map((packageObj) => ({
        key: packageObj._id,
        label: (
            <div className='package-info'>
                <p>Price: {packageObj.price}</p>
                <p>Session Discount: {packageObj.sessionDiscount}</p>
                <p>Pharmacy Discount: {packageObj.medicineDiscount}</p>
                <p>Family Discount: {packageObj.familySubsDiscount}</p>
            </div>
        ),
    }))

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await axios.get(
                    'http://localhost:3000/api/admin/getAllPackages',
                    {
                        withCredentials: true,
                    }
                )
                setAllPackages([
                    {
                        _id: '-1',
                        name: 'No Package',
                        price: 0,
                        sessionDiscount: 0,
                        medicineDiscount: 0,
                        familySubsDiscount: 0,
                    },
                    ...res.data,
                ])
            } catch (error) {
                console.error(error)
            }
        }
        fetchPackages()
    }, [])

    const handleChange = (value) => {
        setSelectedPackage(value)
    }

    const showModal = () => {
        setOpen(true)
    }

    const showPackageModal = () => {
        setPackageOpen(true)
    }

    const handleOk = async () => {
        try {
            setConfirmLoading(true)

            if (formRef.current) {
                await formRef.current.validateFields()

                await axios.put(
                    `http://localhost:3000/api/auth/change-password`,
                    {
                        id: currUser._id,
                        role: role,
                        oldPassword,
                        newPassword,
                    },
                    {
                        withCredentials: true,
                    }
                )
                console.log('Form submitted')
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

    const handlePackageOk = async () => {
        try {
            setConfirmPackageLoading(true)

            if (selectedPackage) {
                const response = await axios.post(
                    `http://localhost:3000/api/patient/add-package/${currUser?._id}`,
                    {
                        packageID: selectedPackage,
                    },
                    {
                        withCredentials: true,
                    }
                )

                console.log('package selected')
                message.success('Package selected successfully!')

                setCurrUserPackageName(response.data.name)
            }

            setPackageOpen(false)
            setConfirmPackageLoading(false)
        } catch (error) {
            console.error('Package changing error:', error)
            setConfirmPackageLoading(false)
        }
    }

    const handlePackageCancel = () => {
        setSelectedPackage(currUser?.package == null ? '-1' : currUser?.package)
        setPackageOpen(false)
    }

    return (
        <div id='patient-profile-body' className='page'>
            <div className='primary-container'>
                <h2>Patient Profile</h2>
                <div className='patient-name'>
                    <h2>{currUser?.name}</h2>
                </div>
                <div className='sub-container'>
                    <p>
                        <strong>Username:</strong> {currUser?.username}
                    </p>
                    <p>
                        <strong>Email:</strong> {currUser?.email}
                    </p>
                    <p>
                        <strong>Phone Number:</strong> {currUser?.phoneNumber}
                    </p>
                    <p>
                        <strong>Date of Birth:</strong>{' '}
                        {new Date(currUser?.birthdate).toDateString()}
                    </p>
                    <p>
                        <strong>Emergency Name:</strong>{' '}
                        {currUser?.emergencyName}
                    </p>
                    <p>
                        <strong>Emergency Phone Number:</strong>{' '}
                        {currUser?.emergencyPhoneNumber}
                    </p>

                    <button className='button' onClick={showModal}>
                        Change Password
                    </button>
                </div>
                <div className='sub-container'>
                    <h2>Health Package</h2>
                    <p>
                        <strong>Package Name:</strong>{' '}
                        {currUserPackageName ||
                            'You are not subscribed to a package'}
                    </p>
                    <Button onClick={showPackageModal}>
                        {currUser?.package ? 'Change Package' : 'Subscribe'}
                    </Button>
                </div>
                <div className='sub-container'>
                    <h2>My Family Members</h2>
                    {currUser?.family.map((member) => (
                        <FamilyMemberCard member={member} mode={'2'} />
                    ))}
                    <Button onClick={showPackageModal}>
                        <LinkOutlined />
                        Link Family Member
                    </Button>
                </div>
                <ViewFamily />
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
            <Modal
                title='Health Package'
                open={packageOpen}
                onOk={handlePackageOk}
                okText='Subscribe'
                confirmLoading={confirmPackageLoading}
                onCancel={handlePackageCancel}
                destroyOnClose>
                <Space wrap>
                    <Select
                        style={{ width: 300 }}
                        defaultValue={selectedPackage}
                        optionLabelProp='label'
                        onChange={handleChange}>
                        {allPackages.map((packageObj) => (
                            <Select.Option
                                key={packageObj._id}
                                value={packageObj._id}
                                label={packageObj.name}>
                                <Space
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}>
                                    {packageObj.name}
                                    <Dropdown
                                        placement='right'
                                        overlay={
                                            <Menu>
                                                {items
                                                    .filter(
                                                        (item) =>
                                                            item.key ===
                                                            packageObj._id
                                                    )
                                                    .map((filteredItem) => (
                                                        <Menu.Item
                                                            key={
                                                                filteredItem.key
                                                            }>
                                                            {filteredItem.label}
                                                        </Menu.Item>
                                                    ))}
                                            </Menu>
                                        }>
                                        <InfoCircleOutlined />
                                    </Dropdown>
                                </Space>
                            </Select.Option>
                        ))}
                    </Select>
                </Space>
            </Modal>
        </div>
    )
}

export default PatientProfile
