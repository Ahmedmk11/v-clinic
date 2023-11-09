import React, { useContext, useState, useEffect } from 'react'
import axiosApi from '../../utils/axiosApi'
import CurrUserContext from '../../contexts/CurrUser'
import PatientInfo from '../../components/patient/PatientProfile/PatientInfo'
import HealthPackage from '../../components/patient/PatientProfile/HealthPackage'
import AddFamily from './AddFamily'
import FamilyAccounts from '../../components/patient/PatientProfile/FamilyAccounts'

const PatientProfile = () => {
    const { currUser } = useContext(CurrUserContext)
    const [allPackages, setAllPackages] = useState(null)

    useEffect(() => {
        axiosApi
            .get('/admin/getAllPackages')
            .then((response) => {
                setAllPackages(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])
<<<<<<< HEAD

    const showModal = () => {
        setOpen(true)
    }

    const showPackageModal = () => {
        setPackageOpen(true)
    }

    const showFamilyModal = () => {
        setOpenFamilyModal(true)
    }

    const handleOk = async () => {
        try {
            setConfirmLoading(true)

            if (formRef.current) {
                await formRef.current.validateFields()

                await axiosApi.put(
                    `/auth/change-password`,
                    {
                        id: currUser._id,
                        role: role,
                        oldPassword,
                        newPassword,
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
                console.log(modalMode)
                let targetUserId = currUser?._id
                if (modalMode === 'family') {
                    targetUserId = selectedFamilyMemberId
                }
                if (
                    (modalMode === 'current' && selectedPackage) ||
                    (modalMode === 'family' && familySelectedPackage)
                ) {
                    
                    const response = await axiosApi.post(
                        `/patient/add-package/${targetUserId}`,
                        {
                            packageID: selectedPackage,
                        }
                    )

                    console.log('package selected')
                    message.success('Package selected successfully!')
                    const res1 = await axiosApi.post(
                        `/patient/buy-package-wallet/${targetUserId}`,
                        {
                            packageID: selectedPackage,
                        }
                    )
                    console.log(currUser.wallet)
                    setCurrUserPackageName(response.data.name)
                    setCurrUser({ ...currUser, wallet: res1.data.wallet })
                    console.log(currUser.wallet)
                }
                console.log('done')

                setPackageOpen(false)
                setModalMode('')
                setConfirmPackageLoading(false)
                setBuyPackage(false)
            } catch (error) {
                console.error('Package changing error:', error)
                setConfirmPackageLoading(false)
            }
        }
    }

    const handlePackageOk = async () => {
        if (selectedPackage !== '-1') {
            setBuyPackage(true)
        } else {
            setBuyPackage(false)
            try {
                setConfirmPackageLoading(true)

                if (selectedPackage) {
                    const response = await axiosApi.post(
                        `/patient/add-package/${currUser?._id}`,
                        {
                            packageID: selectedPackage,
                        }
                    )

                    console.log('package selected')
                    message.success('Package selected successfully!')

                    setCurrUserPackageName(response.data.name)
                }

                setPackageOpen(false)
                setModalMode('')
                setConfirmPackageLoading(false)
            } catch (error) {
                console.error('Package changing error:', error)
                setConfirmPackageLoading(false)
            }
        }
        setPackageOpen(false)
        setModalMode('')
    }

    const handlePackageCancel = () => {
        setBuyPackage(false)
        setSelectedPackage(currUser?.package == null ? '-1' : currUser?.package)
        setPackageOpen(false)
        setModalMode('')
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

=======
>>>>>>> fab496f0f801e28537139b97124c9a0b7b75cb4d
    return (
        <div id='patient-profile-body' className='page'>
            <div className='primary-container'>
                <h2>Patient Profile</h2>
<<<<<<< HEAD
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
                    <Button
                        onClick={() => {
                            setModalMode('current')
                            console.log(modalMode, 'aaa')
                            showPackageModal()
                        }}>
                        {currUser?.package ? 'Change Package' : 'Subscribe'}
                    </Button>
                </div>
                <div className='sub-container'>
                    <h2>My Family</h2>
                    {family?.map((member) => (
                        <FamilyMemberCard member={member} mode={'2'} />
                    ))}
                    <div
                        style={{
                            width: '45%',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <Button onClick={showFamilyModal}>
                            <LinkOutlined />
                            Link Family Member
                        </Button>
                        <Button
                            onClick={() => {
                                setModalMode('family')
                                showPackageModal()
                            }}>
                            Change Package of Family Member
                        </Button>
                    </div>
                </div>
                <ViewFamily />
=======
                <PatientInfo patient={currUser} />
                <HealthPackage allPackages={allPackages} />
                <FamilyAccounts currUser={currUser} allPackages={allPackages} />
                <AddFamily />
>>>>>>> fab496f0f801e28537139b97124c9a0b7b75cb4d
            </div>
        </div>
    )
}

export default PatientProfile
