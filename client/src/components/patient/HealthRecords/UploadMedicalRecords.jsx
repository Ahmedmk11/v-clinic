import React, { useState, useContext } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, Form, message } from 'antd'
import './uploadMedicalRecords.css'
import CurrUserContext from '../../../contexts/CurrUser'
import axiosApi from '../../../utils/axiosApi'

const UploadMedicalRecords = () => {
    const [fileList, setFileList] = useState([])
    const [uploadDisabled, setUploadDisabled] = useState(false)
    const { currUser: Patient, setCurrUser: setPatient } =
        useContext(CurrUserContext)
    const handleSubmit = () => {
        if (fileList.length < 1)
            return message.error('Please upload your documents!')
        const formData = new FormData()
        for (let i = 0; i < fileList.length; i++) {
            formData.append(`files`, fileList[i].originFileObj)
        }
        formData.append('id', Patient._id)
        axiosApi
            .post('/patient/upload-health-records', formData)
            .then((res) => {
                setPatient({
                    ...Patient,
                    health_records: res.data.UploadedMedicalRecords,
                })
                setFileList([])
                message.success('Documents Uploaded Successfully')
            })
            .catch((err) => {
                console.log(err), message.error('Failed to upload documents')
            })
    }

    const onFinish = (values) => {
        // Handle form submission with form values and fileList data
        handleSubmit()
    }

    const handleChange = ({ fileList }) => {
        setFileList(fileList)
        setUploadDisabled(fileList.length > 6)
    }

    const customRequest = ({ onSuccess, onError, file }) => {
        setTimeout(() => {
            onSuccess('ok')
        }, 0)
    }
    return (
        <div className='sub-container medical-records-upload'>
            <h2 style={{ marginBottom: '0px' }}>Upload Medical History</h2>
            <p className='allowed-formats'>
                <strong>Allowed formats:</strong> .jpg, .jpeg, .png, .pdf.
                <br />
                <strong>Maximum of 7 files allowed per upload.</strong>
            </p>

            <Form onFinish={onFinish}>
                <Form.Item
                    name='documents'
                    rules={[
                        {
                            required: true,
                            message: 'Please upload your documents!',
                        },
                    ]}>
                    <Upload
                        customRequest={customRequest}
                        listType='picture'
                        fileList={fileList}
                        onChange={handleChange}
                        accept='.jpg, .jpeg, .png, .pdf'
                        className='upload-list-inline'>
                        <Button
                            icon={<UploadOutlined />}
                            disabled={uploadDisabled}>
                            Upload
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                    }}>
                    <Button type='primary' htmlType='submit'>
                        Submit Documents
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default UploadMedicalRecords
