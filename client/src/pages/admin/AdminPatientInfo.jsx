import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import calcAge from '../../utils/calcAge'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import axiosApi from '../../utils/axiosApi'
const { confirm } = Modal

const AdminPatientInfo = () => {
    const [SelectedPatient, setSelectedPatient] = useState({})
    const id = window.location.href.split('/').pop()
    const navigate = useNavigate()

    useEffect(() => {
        axiosApi
            .get(`/patient/get-patient-by-id/${id}`)
            .then((res) => {
                console.log(res.data)
                setSelectedPatient(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    const showDeleteConfirm = () => {
        confirm({
            title: `Are you sure want to delete ${SelectedPatient.name}?`,
            icon: <ExclamationCircleFilled />,
            content: 'Please confirm!',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDelete()
            },
            onCancel() {
                console.log('Cancel')
            },
        })
    }
    const success = () => {
        Modal.success({
            content: `${SelectedPatient.name} has been deleted.`,
            onOk() {
                navigate('/admin/view-patients')
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
            .delete(`/admin/deleteUser/${id}`, {
                data: { type: 'patient' },
            })
            .then((res) => success())
            .catch((err) => {
                console.log(err)
                error()
            })
    }

    return (
        <div className='page'>
            <div className='primary-container'>
                <h2>Selected Patient</h2>
                <div className='patient-name'>
                    <h2>
                        {SelectedPatient.name}
                        {"'s Information"}
                    </h2>
                </div>
                <div className='sub-container patient-info'>
                    <ul>
                        <li>
                            <strong>Username: </strong>{' '}
                            {SelectedPatient.username}
                        </li>
                        <li>
                            <strong>Phone Number: </strong>
                            <a href={`tel:${SelectedPatient.phoneNumber}`}>
                                {SelectedPatient.phoneNumber}
                            </a>
                        </li>
                        <li>
                            <strong>Email: </strong>{' '}
                            <a href={`mailto:${SelectedPatient.email}`}>
                                {SelectedPatient.email}
                            </a>
                        </li>
                        <li>
                            <strong>Age: </strong>{' '}
                            {calcAge(SelectedPatient.birthdate)}
                        </li>
                        <li>
                            <strong>Gender: </strong> {SelectedPatient.gender}
                        </li>
                        <li>
                            <strong>Package: </strong>{' '}
                            {SelectedPatient?.package?.name ||
                                'No Package Selected'}
                        </li>
                        <li>
                            <strong>Emergency Contact: </strong>{' '}
                            {`${SelectedPatient.emergencyName},`}{' '}
                            <a
                                href={`tel:${SelectedPatient.emergencyPhoneNumber}`}>
                                {SelectedPatient.emergencyPhoneNumber}
                            </a>
                        </li>
                    </ul>
                    <Button type='primary' onClick={showDeleteConfirm} danger>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AdminPatientInfo
