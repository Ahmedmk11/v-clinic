import { Button, Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import axiosApi from '../../../utils/axiosApi'
const { confirm } = Modal

const AdminCard = ({ admin, onDelete }) => {
    const id = admin._id
    const navigate = useNavigate()
    const showDeleteConfirm = () => {
        confirm({
            title: `Are you sure want to delete ${admin.Username}?`,
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
            content: `${admin.Username} has been deleted.`,
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
            <h3>{admin.Username}</h3>
            <p>
                <strong>Created at: </strong>
                {new Date(admin.createdAt).toDateString()}
            </p>
            <Button type='primary' onClick={showDeleteConfirm} danger>
                Delete
            </Button>
        </div>
    )
}

export default AdminCard
