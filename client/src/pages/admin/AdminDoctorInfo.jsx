import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosApi from '../../utils/axiosApi'
import calcAge from '../../utils/calcAge'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Button, Modal } from 'antd'
const { confirm } = Modal

const AdminDoctorInfo = () => {
    const [SelectedDoctor, setSelectedDoctor] = useState({})
    const { id, type } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axiosApi
            .get(`/admin/getUser/${id}/doctor`)
            .then((res) => {
                setSelectedDoctor(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    const getPatientInfo = () => {
        return (
            <>
                <ul>
                    <li>
                        <strong>ID: </strong> {SelectedDoctor._id}
                    </li>
                    <li>
                        <strong>Username: </strong> {SelectedDoctor.username}
                    </li>
                    <li>
                        <strong>Email: </strong>{' '}
                        <a href={`mailto:${SelectedDoctor.email}`}>
                            {SelectedDoctor.email}
                        </a>
                    </li>
                    <li>
                        <strong>Age: </strong>{' '}
                        {calcAge(SelectedDoctor.dob)}
                    </li>
                    <li>
                        <strong>Hourly Rate: </strong>{' '}
                        {SelectedDoctor.hourly_rate}
                    </li>
                    <li>
                        <strong>Affiliation: </strong>{' '}
                        {SelectedDoctor.affiliation}
                    </li>
                    <li>
                        <strong>Education: </strong> {SelectedDoctor.education}
                    </li>
                    <li>
                        <strong>Status: </strong> {SelectedDoctor.status}
                    </li>
                    <li>
                        <strong>Speciality: </strong>{' '}
                        {SelectedDoctor.speciality}
                    </li>
                </ul>
                <Button type='primary' onClick={showDeleteConfirm} danger>
                    Delete
                </Button>
            </>
        )
    }

    const showDeleteConfirm = () => {
        confirm({
            title: `Are you sure want to delete ${SelectedDoctor.name}?`,
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
            content: `${SelectedDoctor.name} has been deleted.`,
            onOk() {
                navigate('/admin/view-doctors')
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
                data: { type: 'doctor' },
            })
            .then((res) => success())
            .catch((err) => {
                console.log(err)
                error()
            })
    }

    return (<div className='page'>

        <div className='primary-container'>
            <h2>Selected Doctor</h2>
            <div className='patient-name'>
                <h2>
                    {SelectedDoctor.name}
                    {"'s Information"}
                </h2>
            </div>
            <div className='sub-container patient-info'>{getPatientInfo()}</div>
        </div>
    </div>
    )
}

export default AdminDoctorInfo
