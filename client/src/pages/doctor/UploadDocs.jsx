import { useContext, useState } from 'react'
import CurrUserContext from '../../contexts/CurrUser'
import { Upload, Modal, Button, message, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import getBase64 from '../../utils/getBase64'
import ImageGallery from '../../components/reusable/ImageGallery/ImageGallery'
import axiosApi, { baseURL } from '../../utils/axiosApi'
const UploadDocs = () => {
    const { currUser: Doctor, setCurrUser: setDoctor } =
        useContext(CurrUserContext)
    const [fileList, setFileList] = useState([])
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState()

    const handleSubmit = () => {
        if (fileList.length < 1)
            return message.error('Please upload your documents!')
        const formData = new FormData()
        for (let i = 0; i < fileList.length; i++) {
            formData.append(`files`, fileList[i].originFileObj)
        }
        formData.append('id', Doctor._id)
        axiosApi
            .post('/doctor/upload', formData)
            .then((res) => {
                setDoctor({
                    ...Doctor,
                    uploaded_documents: res.data.uploaded_documents,
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
    const customRequest = ({ onSuccess, onError, file }) => {
        setTimeout(() => {
            onSuccess('ok')
        }, 0)
    }
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            // If the file doesn't have a URL or preview data, create a preview
            const previewUrl = await getBase64(file.originFileObj) // Call a function to convert the file to a data URL
            file.preview = previewUrl // Add the preview URL to the file object
        }
        setPreviewImage(file.preview)
        setPreviewVisible(true)
    }

    const CustomImagePreview = ({ visible, imageUrl, onCancel }) => {
        return (
            <Modal open={visible} onCancel={onCancel} footer={null}>
                <img
                    alt='Preview'
                    style={{ width: '100%', marginTop: '25px' }}
                    src={imageUrl}
                />
            </Modal>
        )
    }

    const handleChange = ({ fileList }) => {
        setFileList(fileList)
    }

    const RequirementsEmail = () => {
        return (
            <div className='sub-container'>
                <div style={{ fontFamily: 'Arial, sans-serif' }}>
                    <h2>Dear Doctor {Doctor?.name},</h2>
                    <p>
                        Thank you for registering with our platform. We
                        appreciate your interest in joining our community.
                    </p>
                    <p>
                        To complete your registration process, we kindly request
                        you to submit the following documents:
                    </p>
                    <ol>
                        <li>
                            <strong>Government-issued ID:</strong> Please upload
                            a clear copy of your identification card or
                            passport.
                        </li>
                        <li>
                            <strong>Medical Licenses:</strong> Provide copies of
                            your valid medical licenses.
                        </li>
                        <li>
                            <strong>Medical Degree:</strong> Upload a copy of
                            your medical degree certificate.
                        </li>
                    </ol>
                    <p>
                        Submitting these documents is essential to verifying
                        your identity and qualifications as a medical
                        professional. Rest assured that all your documents will
                        be kept confidential and used solely for verification
                        purposes.
                    </p>
                    <p>
                        You can submit the required documents from the section
                        below, or you can upload it later just navigate to the
                        'Document Upload' section in your profile settings. If
                        you have any questions or encounter any issues during
                        the submission process, don't hesitate to reach out to
                        our support team.
                    </p>
                    <p>Thank you for your cooperation.</p>
                    <p>
                        Best regards,
                        <br />
                        <strong>V-Clinic</strong>
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className='page'>
            <div className='primary-container'>
                <h2>Upload Documents</h2>
                <RequirementsEmail />
                <div className='sub-container'>
                    <h2>Uploaded Documents</h2>
                    {Doctor?.uploaded_documents.length > 0 ? (
                        <ImageGallery
                            images={Doctor?.uploaded_documents?.map(
                                (url) => baseURL + url
                            )}
                        />
                    ) : (
                        <p>No Documents Uploaded Yet</p>
                    )}
                </div>
                <div className='sub-container'>
                    <h2>Upload Documents</h2>
                    <p>
                        <strong> Allowed formats : jpg, jpeg, png </strong>
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
                                fileList={fileList}
                                onChange={handleChange}
                                listType='picture-card'
                                accept='.jpg, .jpeg, .png'
                                onPreview={handlePreview}>
                                {fileList.length >= 7 ? null : (
                                    <div>
                                        <PlusOutlined />
                                        <div className='upload-text'>
                                            Upload
                                        </div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <CustomImagePreview
                                visible={previewVisible}
                                imageUrl={previewImage}
                                onCancel={() => setPreviewVisible(false)}
                            />
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
            </div>
        </div>
    )
}

export default UploadDocs
