import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Button, Modal, Input } from 'antd'
import axiosApi from '../../utils/axiosApi'
const { confirm } = Modal

const AdminPackageInfo = () => {
    const [SelectedPackage, setSelectedPackage] = useState({})
    const [editedPackage, setEditedPackage] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [editMessage, setEditMessage] = useState('')
    const { id, type } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axiosApi
            .get(`/admin/getPackage/${id}`)
            .then((res) => {
                setSelectedPackage(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    const inputStyle = {
        width: '100px',
        fontSize: '19px',
        padding: '1%',
        height: '30px',
    }

    const messageStyle = {
        opacity: '1',
        backgroundColor: '#9e9e9e',
        color: '#ffffff',
        borderRadius: '10px',
        border: '1px solid #9e9e9e',
        width: '500px',
        padding: '4px',
        paddingLeft: '10px',
        fontSize: '13px',
        transition: '0.5s ease-in-out',
    }

    const enterEdit = () => {
        setEditMode(true)
        setEditedPackage(SelectedPackage)
    }

    const cancelEdit = () => {
        setEditMode(false)
        setEditedPackage(SelectedPackage)
    }

    const saveFunc = async () => {
        try {
            const ret = await axiosApi.put(
                `/admin/updatePackage/${id}`,
                editedPackage
            )
            setEditMessage('change saved successfully')
            setSelectedPackage(editedPackage)
            setEditMode(false)
        } catch (error) {
            setEditMessage(error.response.data.error)
        } finally {
            setTimeout(() => {
                setEditMessage('')
            }, 5000)
        }
    }

    const handleInputChange = (e) => {
        setEditedPackage({
            ...editedPackage,
            [e.target.name]: e.target.value,
        })
    }

    const getPatientInfo = () => {
        return (
            <>
                <ul>
                    <li>
                        <strong>ID: </strong> {SelectedPackage._id}
                    </li>
                    <li>
                        <strong>Price: </strong>
                        {!editMode ? (
                            ` ${SelectedPackage.price} L.E`
                        ) : (
                            <Input
                                name='price'
                                value={editedPackage.price}
                                type='number'
                                onChange={handleInputChange}
                                style={inputStyle}
                            />
                        )}
                    </li>
                    <li>
                        <strong>Session Discount: </strong>
                        {!editMode ? (
                            ` ${SelectedPackage.sessionDiscount}%`
                        ) : (
                            <Input
                                name='sessionDiscount'
                                value={editedPackage.sessionDiscount}
                                type='number'
                                onChange={handleInputChange}
                                style={inputStyle}
                            />
                        )}
                    </li>
                    <li>
                        <strong>Medicine Discount: </strong>{' '}
                        {!editMode ? (
                            ` ${SelectedPackage.medicineDiscount}%`
                        ) : (
                            <Input
                                name='medicineDiscount'
                                value={editedPackage.medicineDiscount}
                                type='number'
                                onChange={handleInputChange}
                                style={inputStyle}
                            />
                        )}
                    </li>
                    <li>
                        <strong>Family Subscription Discount: </strong>{' '}
                        {!editMode ? (
                            ` ${SelectedPackage.familySubsDiscount}%`
                        ) : (
                            <Input
                                name='familySubsDiscount'
                                value={editedPackage.familySubsDiscount}
                                type='number'
                                onChange={handleInputChange}
                                style={inputStyle}
                            />
                        )}
                    </li>
                </ul>
                {!editMode ? (
                    <div
                        style={{
                            marginLeft: 'auto',
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: 140,
                        }}>
                        <Button
                            type='primary'
                            onClick={showDeleteConfirm}
                            danger>
                            Delete
                        </Button>
                        <Button type='primary' onClick={enterEdit}>
                            Edit
                        </Button>
                    </div>
                ) : (
                    <div className='edit-buttons'>
                        <Button type='primary' onClick={cancelEdit} danger>
                            Cancel
                        </Button>
                        <Button type='primary' onClick={saveFunc}>
                            Save
                        </Button>
                    </div>
                )}
            </>
        )
    }

    const showDeleteConfirm = () => {
        confirm({
            title: `Are you sure want to delete ${SelectedPackage.name}?`,
            icon: <ExclamationCircleFilled />,
            content: 'Please confirm!',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDelete()
            },
        })
    }
    const success = () => {
        Modal.success({
            content: `${SelectedPackage.name} has been deleted.`,
            onOk() {
                navigate('/admin/view-Packages')
            },
        })
    }

    const error = () => {
        Modal.error({
            title: 'Could not delete this user.',
            content: 'Please try again later.',
        })
    }
    const handleDelete = () => {
        axiosApi
            .delete(`/admin/deletePackage/${id}`)
            .then((res) => success())
            .catch((err) => {
                error()
            })
    }

    return (
        <div className='page'>
            <div className='primary-container'>
                <h2>Selected Package</h2>
                <div className='patient-name'>
                    <h2>{SelectedPackage.name}</h2>
                </div>

                <div className='sub-container patient-info'>
                    {editMessage ? (
                        <div style={messageStyle}>{editMessage}</div>
                    ) : null}
                    {getPatientInfo()}
                </div>
            </div>
        </div>
    )
}

export default AdminPackageInfo
