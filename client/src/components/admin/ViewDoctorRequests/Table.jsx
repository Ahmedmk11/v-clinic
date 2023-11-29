import React from 'react'
import axiosApi, { baseURL } from '../../../utils/axiosApi'
import { Space, Table, Button } from 'antd'
import PopMessage from './PopMessage'
import { message } from 'antd'
import ImageGallery from '../../reusable/ImageGallery/ImageGallery'
const AntTable = ({ requests, setRequests }) => {
    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            width: 120, // Set width for Username column
        },
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            width: 110, // Set width for ID column
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100, // Set width for Status column
            render: (status) => <span className={status}>{status}</span>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 120, // Set width for Name column
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 180, // Set width for Email column
            render: (email) => <a href={`mailto:${email}`}>{email}</a>,
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            render: (dob) => new Date(dob).toLocaleDateString(),
            key: 'dob',
            width: 120, // Set width for Date of Birth column
        },
        {
            title: 'Hourly Rate',
            dataIndex: 'hourly_rate',
            key: 'hourly_rate',
            width: 100, // Set width for Hourly Rate column
        },
        {
            title: 'Affiliation',
            dataIndex: 'affiliation',
            key: 'affiliation',
            width: 120, // Set width for Affiliation column
        },
        {
            title: 'Education',
            dataIndex: 'education',
            key: 'education',
            width: 120, // Set width for Education column
        },
        {
            title: 'Speciality',
            dataIndex: 'speciality',
            key: 'speciality',
            width: 120, // Set width for Speciality column
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space
                    size='middle'
                    style={{ display: 'flex', flexDirection: 'column' }}>
                    <PopMessage
                        record={record}
                        title={'Are you sure'}
                        Button={AcceptButton(record)}
                        onConfirm={handleConfirm('Active')}
                    />
                    <PopMessage
                        record={record}
                        title={'Are you sure'}
                        Button={RejectButton(record)}
                        onConfirm={handleConfirm('Rejected')}
                    />
                </Space>
            ),
            fixed: 'right',
            width: 100, // Set width for Action column
        },
    ]

    const AcceptButton = (record) => {
        return (
            <Button
                type='primary'
                disabled={record.status !== 'Pending'}
                style={{ backgroundColor: 'var(--main-blue)' }}>
                Accept
            </Button>
        )
    }

    const RejectButton = (record) => {
        return (
            <Button
                type='primary'
                danger
                disabled={record.status !== 'Pending'}>
                Reject
            </Button>
        )
    }

    const handleConfirm = (newStatus) => async (record) => {
        const { key, ...doctor } = record
        doctor.status = newStatus
        try {
            await axiosApi.put(
                `/admin/updateDoctorStatus`,
                { id: doctor._id, status: newStatus }
            )
            newStatus === 'Active'
                ? message.success('Doctor Accepted')
                : message.error('Doctor Rejected')
            setRequests(
                requests.map((request) =>
                    request._id === doctor._id ? doctor : request
                )
            )
        } catch (err) {
            console.log(err)
            message.error('Failed.')
        }
    }

    const expandable = {
        expandedRowRender: (record) =>
            record.uploaded_documents.length > 0 ? (
                <ImageGallery
                    images={record?.uploaded_documents?.map(
                        (url) => baseURL+ url
                    )}
                />
            ) : (
                <p>No Documents Uploaded</p>
            ),
        fixed: true,
    }

    const scroll = {
        y: 500,
        x: '100vw',
    }

    const rowSelection = {
        fixed: false,
    }
    const pageSizeOptions = ['5', '10', '20']
    const pagination = {
        pageSizeOptions, // Options for the number of columns per page dropdown
        showSizeChanger: true, // Show the columns per page dropdown
        showTotal: (total) => `Total ${total} rows`, // Custom text displayed for total rows count
    }
    return (
        <>
            <Table
                size='middle'
                expandable={expandable}
                columns={columns}
                dataSource={requests.map((request, i) => {
                    return { ...request, key: i }
                })}
                scroll={scroll}
                rowSelection={rowSelection}
                pagination={pagination}
            />
        </>
    )
}

export default AntTable
