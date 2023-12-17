import React, { useState, useContext, useEffect } from 'react'
import { Modal, Button, Select, message, Dropdown, Menu, Form } from 'antd'
import { ExclamationCircleFilled, InfoCircleOutlined } from '@ant-design/icons'
import PackageInfo from './PackageInfo'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import CurrUserContext from '../../../contexts/CurrUser'
import axiosApi from '../../../utils/axiosApi'
import { useNavigate } from 'react-router-dom'
const { Option } = Select
const { confirm } = Modal

const SubscribeHealthPackage = ({
    open,
    setOpen,
    allPackages,
    targetSubscriberType,
    familyMemberProfiles,
    setFamilyMemberProfiles,
}) => {
    const [selectedPackageId, setSelectedPackageId] = useState(null)
    const [confirmPackageLoading, setConfirmPackageLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [subscriber, setSubscriber] = useState(null)
    const { currUser, setCurrUser } = useContext(CurrUserContext)
    const [form] = Form.useForm()
    const navigate = useNavigate()

    useEffect(() => {
        if (targetSubscriberType === 'patient') setSubscriber(currUser)
    }, [targetSubscriberType, currUser])

    const handlePayWithCard = async () => {
        try {
            const res = await axiosApi.post(
                `patient/buy-package-card/${subscriber._id}`,
                { id: selectedPackageId }
            )
            window.location = res.data.ret
        } catch (error) {
            console.log(error)
            message.error('Service Unavailable')
        }
    }

    const handlePayWithWallet = async () => {
        const selectedPackage = allPackages?.find(
            (currPackage) => currPackage._id == selectedPackageId
        )
        if (currUser?.wallet < selectedPackage?.price)
            message.error('Insufficient Funds!')
        else {
            try {
                setConfirmPackageLoading(true)
                const response = await axiosApi.post(
                    `/patient/add-package/${subscriber._id}`,
                    { packageID: selectedPackageId }
                )
                const res1 = await axiosApi.post(
                    `/patient/buy-package-wallet/${currUser?._id}`,
                    { packageID: selectedPackageId }
                )
                if (targetSubscriberType === 'patient')
                    setCurrUser({
                        ...currUser,
                        wallet: res1.data.wallet,
                        package: response.data.package,
                        packageStatus: 'Active',
                        packageRenewalDate: response.data.renewalDate,
                    })
                else if (targetSubscriberType === 'family') {
                    setCurrUser({
                        ...currUser,
                        wallet: res1.data.wallet,
                    })
                    setFamilyMemberProfiles(
                        familyMemberProfiles.map((member) => {
                            if (member._id == subscriber._id) {
                                return {
                                    ...member,
                                    package: response.data.package,
                                }
                            }
                            return member
                        })
                    )
                }
                onCancelModal()
                message.success('Package selected successfully!')
            } catch (error) {
                console.error('Package changing error:', error)
                message.error('Error changing package!')
            } finally {
                setConfirmPackageLoading(false)
            }
        }
    }

    const onCancelModal = () => {
        setOpen(false)
        setPage(1)
        setSelectedPackageId(null)
        form.resetFields()
    }
    const showPayConfirm = (type) => {
        confirm({
            title: `Confirm Purchasing Package With ${type}`,
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => {
                if (type === 'Wallet') {
                    handlePayWithWallet()
                }
                if (type === 'Card') {
                    handlePayWithCard()
                }
            },
            onCancel() {
                console.log('Cancel')
            },
        })
    }

    const goToPaymentChoices = async () => {
        setConfirmPackageLoading(true)
        if (targetSubscriberType == 'family') {
            try {
                const res = await axiosApi.get(
                    `/patient/get-patient-by-id/${subscriber._id}`
                )
                if (res.data?.package?._id == selectedPackageId) {
                    message.error('Already subscribed to this package')
                    setConfirmPackageLoading(false)
                    return
                }
            } catch (error) {
                console.error('get family member error:', error)
                message.error('Error getting family member!')
            }
        }
        if (selectedPackageId && selectedPackageId == subscriber?.package?._id)
            message.error('Already subscribed to this package')
        else form.validateFields().then(() => setPage(2))
        setConfirmPackageLoading(false)
    }

    const items = allPackages?.map((packageObj) => ({
        key: packageObj._id,
        label: (
            <div className='package-info'>
                <p>
                    <span
                        style={{
                            fontWeight: 700,
                        }}>
                        Price:
                    </span>{' '}
                    ${packageObj.price}
                </p>
                <p>
                    <span
                        style={{
                            fontWeight: 700,
                        }}>
                        Session Discount:
                    </span>{' '}
                    {packageObj.sessionDiscount}%
                </p>
                <p>
                    <span
                        style={{
                            fontWeight: 700,
                        }}>
                        Pharmacy Discount:
                    </span>{' '}
                    {packageObj.medicineDiscount}%
                </p>
                <p>
                    <span
                        style={{
                            fontWeight: 700,
                        }}>
                        Family Discount:
                    </span>{' '}
                    {packageObj.familySubsDiscount}%
                </p>
            </div>
        ),
    }))

    const Page2Buttons = () => {
        return (
            <>
                <Button
                    key='back'
                    onClick={() => {
                        setPage(1)
                        setSelectedPackageId(null)
                        form.resetFields()
                    }}>
                    Return
                </Button>
                <Button
                    key='submit1'
                    type='primary'
                    loading={confirmPackageLoading}
                    onClick={() => showPayConfirm('Card')}>
                    Pay With Card
                </Button>
                <Button
                    key='submit2'
                    type='primary'
                    onClick={() => showPayConfirm('Wallet')}>
                    Pay With Wallet
                </Button>
            </>
        )
    }

    const Page2Content = () => {
        return allPackages
            ?.filter((currPackage) => currPackage._id == selectedPackageId)
            .map((currPackage) => (
                <PackageInfo
                    key={currPackage._id + 'packid'}
                    healthPackage={currPackage}
                />
            ))
    }

    return (
        <>
            <Modal
                key='payModal'
                title='Health Package'
                open={open}
                confirmLoading={confirmPackageLoading}
                onCancel={onCancelModal}
                destroyOnClose
                footer={[
                    <div key='footerdiv78'>
                        <ConditionalRender
                            condition={page === 1}
                            elseComponent={<Page2Buttons />}>
                            <Button onClick={onCancelModal}>Cancel</Button>
                            <Button
                                key='next-button0'
                                type='primary'
                                onClick={goToPaymentChoices}>
                                Next
                            </Button>
                        </ConditionalRender>
                    </div>,
                ]}>
                <ConditionalRender
                    condition={page === 1}
                    elseComponent={<Page2Content />}>
                    <Form form={form} layout='vertical'>
                        <Form.Item
                            name='package'
                            label='Select a package'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a package!',
                                },
                            ]}>
                            <Select
                                placeholder='Select a package'
                                style={{ width: 300 }}
                                optionLabelProp='label'
                                onChange={(value) => {
                                    setSelectedPackageId(value)
                                }}>
                                {allPackages?.map((currPackage) => (
                                    <Option
                                        key={currPackage._id}
                                        value={currPackage._id}
                                        label={currPackage.name}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}>
                                            <span>{currPackage.name}</span>
                                            <Dropdown
                                                overlayClassName='drpdn-class'
                                                placement='right'
                                                overlay={
                                                    <Menu>
                                                        {items
                                                            .filter(
                                                                (item) =>
                                                                    item.key ===
                                                                    currPackage._id
                                                            )
                                                            .map(
                                                                (
                                                                    filteredItem
                                                                ) => (
                                                                    <Menu.Item
                                                                        key={
                                                                            filteredItem.key
                                                                        }>
                                                                        {
                                                                            filteredItem.label
                                                                        }
                                                                    </Menu.Item>
                                                                )
                                                            )}
                                                    </Menu>
                                                }>
                                                <InfoCircleOutlined />
                                            </Dropdown>
                                        </div>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <ConditionalRender
                            condition={targetSubscriberType == 'family'}>
                            <Form.Item
                                name={'familyMember'}
                                label='Select a family member'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please select a family member!',
                                    },
                                ]}>
                                <Select
                                    style={{ width: 300 }}
                                    onChange={(value) => {
                                        setSubscriber(
                                            familyMemberProfiles.find(
                                                (member) => member._id == value
                                            )
                                        )
                                    }}
                                    placeholder='Select a family member'>
                                    {familyMemberProfiles?.map((member, i) => (
                                        <Select.Option
                                            key={member._id}
                                            value={member._id}
                                            label={member.name}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                }}>
                                                <span>{member.name}</span>
                                            </div>
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </ConditionalRender>
                    </Form>
                </ConditionalRender>
            </Modal>
        </>
    )
}
export default SubscribeHealthPackage
