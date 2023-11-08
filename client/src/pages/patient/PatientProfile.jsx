import './css/ViewDoctors.css'

import { useState, useContext, useRef, useEffect } from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons'
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
import { InfoCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
const { confirm } = Modal

const PatientProfile = () => {
    const formRef = useRef(null)

    const { currUser, role, setCurrUser } = useContext(CurrUserContext)

    const [currUserPackageName, setCurrUserPackageName] = useState(null)

    const [allPackages, setAllPackages] = useState([])

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [open, setOpen] = useState(false)
    const [packageOpen, setPackageOpen] = useState(false)
    const [buyPackage, setBuyPackage] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [confirmPackageLoading, setConfirmPackageLoading] = useState(false)

    const [selectedPackage, setSelectedPackage] = useState('-1')

    // useEffect(() => {
    //     console.log(currUser?.wallet)
    // }, [currUser?.wallet])

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

    const handleBack = () => {
        setBuyPackage(false)
        setPackageOpen(true)
    }

    const handlePayWithWallet = async () => {
        let pack = null
        for (let i = 0; i < allPackages.length; i++)
            if (allPackages[i]._id === selectedPackage) {
                pack = allPackages[i]
                break
            }
        if (currUserPackageName === pack.name) {
            message.error('Already Subscribed to this package!')
            return
        }

        if (currUser?.wallet < pack.price) {
            message.error('Insufficient Funds!')
        } else {
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
                    const res1 = await axios.post(
                        `http://localhost:3000/api/patient/buy-package-wallet/${currUser?._id}`,
                        {
                            packageID: selectedPackage,
                        },
                        {
                            withCredentials: true,
                        }
                    )
                    setCurrUserPackageName(response.data.name)
                    setCurrUser({ ...currUser, wallet: res1.data.wallet })
                }
                console.log('done')

                setPackageOpen(false)
                setConfirmPackageLoading(false)
                setBuyPackage(false)
            } catch (error) {
                console.error('Package changing error:', error)
                setConfirmPackageLoading(false)
            }
        }
    }
    const handlePackageOk = async () => {
        if (selectedPackage != -1) {
            setBuyPackage(true)
            // console.log(selectedPackage)
        } else setBuyPackage(false)
        setPackageOpen(false)
        // try {
        //     setConfirmPackageLoading(true)

        //     if (selectedPackage) {
        //         const response = await axios.post(
        //             `http://localhost:3000/api/patient/add-package/${currUser?._id}`,
        //             {
        //                 packageID: selectedPackage,
        //             },
        //             {
        //                 withCredentials: true,
        //             }
        //         )

        //         console.log('package selected')
        //         message.success('Package selected successfully!')

        //         setCurrUserPackageName(response.data.name)
        //     }

        //     setPackageOpen(false)
        //     setConfirmPackageLoading(false)
        // } catch (error) {
        //     console.error('Package changing error:', error)
        //     setConfirmPackageLoading(false)
        // }
    }

    const handlePackageCancel = () => {
        setBuyPackage(false)
        setSelectedPackage(currUser?.package == null ? '-1' : currUser?.package)
        setPackageOpen(false)
    }

    const showPayConfirm = () => {
        confirm({
            title: `Confirm Purchasing Package With Wallet`,
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                handlePayWithWallet()
            },
            onCancel() {
                console.log('Cancel')
            },
        })
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
                                        menu={
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
            <Modal
                title='Health Package'
                open={buyPackage}
                confirmLoading={confirmPackageLoading}
                onCancel={handlePackageCancel}
                destroyOnClose
                footer={[
                    <Button key='back' onClick={handleBack}>
                        Return
                    </Button>,
                    <Button
                        key='submit1'
                        type='primary'
                        loading={confirmPackageLoading}
                        onClick={handleBack}>
                        Pay With Card
                    </Button>,
                    <Button
                        key='submit2'
                        type='primary'
                        loading={confirmPackageLoading}
                        onClick={showPayConfirm}>
                        Pay With Wallet
                    </Button>,
                ]}>
                {allPackages
                    .filter((currPackage) => currPackage._id == selectedPackage)
                    .map((currPackage) => (
                        <div key={currPackage._id}>
                            <p>
                                <strong>Name: </strong> {currPackage.name}
                            </p>
                            <p>
                                <strong>Session Discount: </strong>{' '}
                                {currPackage.sessionDiscount}%
                            </p>
                            <p>
                                <strong>Pharmacy Discount: </strong>{' '}
                                {currPackage.medicineDiscount}%
                            </p>
                            <p>
                                <strong>Family Discount: </strong>{' '}
                                {currPackage.familySubsDiscount}%
                            </p>
                            <p>
                                <strong>Price: </strong> {currPackage.price} EGP
                            </p>
                        </div>
                    ))}
            </Modal>
        </div>
    )
}

export default PatientProfile
