import { Button, Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import axiosApi from '../../../utils/axiosApi'
const { confirm } = Modal

const AdminCard = ({ admin, onDelete }) => {
    console.log('admin', admin)
    const id = admin._id
    const showDeleteConfirm = () => {
        confirm({
            title: `Are you sure want to delete ${admin.username}?`,
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
            content: `${admin.username} has been deleted.`,
            onOk() {
                onDelete(id)
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
                data: { type: 'admin' },
            })
            .then((res) => {
                success()
            })
            .catch((err) => {
                console.log(err)
                error()
            })
    }

    return (
        <div className='card'>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: 0,
                }}>
                <h3
                    style={{
                        margin: '0',
                    }}>
                    {admin.name}
                </h3>
                <h5
                    style={{
                        fontSize: '1rem',
                        margin: '0',
                    }}>
                    @{admin.username}
                </h5>
            </div>
            <h5
                style={{
                    fontSize: '0.8rem',
                    margin: '0.5rem 0',
                }}>
                {admin.email}
            </h5>
            <p
                style={{
                    fontSize: '0.8rem',
                    margin: '0.5rem 0',
                }}>
                Created on {new Date(admin.createdAt).toDateString()}
            </p>
            <Button type='primary' onClick={showDeleteConfirm} danger>
                Delete Admin
            </Button>
        </div>
    )
}

export default AdminCard
