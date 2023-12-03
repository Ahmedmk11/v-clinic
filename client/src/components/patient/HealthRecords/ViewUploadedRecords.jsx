import { useState } from 'react'
import { Button, Tabs, message } from 'antd'
import ImageGallery from '../../reusable/ImageGallery/ImageGallery'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import PdfViewer from '../../reusable/PdfViewer/PdfViewer'
import './viewUploadedRecords.css'
import axiosApi, { baseURL } from '../../../utils/axiosApi'

const ViewUploadedRecords = ({ Patient, setPatient, role }) => {
    const images = Patient?.health_records?.filter(
        (healthRecord) => !healthRecord?.path?.toLowerCase().includes('.pdf')
    )

    const pdfs = Patient?.health_records?.filter((healthRecord) =>
        healthRecord?.path?.toLowerCase().includes('.pdf')
    )

    const onRemoveImage = (imagePath, setVisible) => {
        imagePath = imagePath.split(baseURL)[1]
        axiosApi
            .delete('/patient/remove-uploaded-file', {
                params: { id: Patient._id, filePath: imagePath },
            })
            .then((res) => {
                setPatient({
                    ...Patient,
                    health_records: res.data.health_records,
                })
                setVisible(false)
                message.success('Image deleted successfully')
            })
            .catch((err) => {
                message.error('Error deleting image')
                console.log(err)
            })
    }

    const onRemovePdf = (pdfPath) => {
        axiosApi
            .delete('/patient/remove-uploaded-file', {
                params: { id: Patient._id, filePath: pdfPath },
            })
            .then((res) => {
                setPatient({
                    ...Patient,
                    health_records: res.data.health_records,
                })
                message.success('PDF deleted successfully')
            })
            .catch((err) => {
                message.error('Error deleting PDF')
                console.log(err)
            })
    }

    const pdfTabItems = pdfs?.map((healthRecord, i) => {
        return {
            label: healthRecord?.originalname,
            key: i,
            children: (
                <>
                    <PdfViewer pdfUrl={baseURL + healthRecord?.path} />
                    <ConditionalRender condition={role === 'patient'}>
                        <div className='remove-pdf-button-container'>
                            <Button
                                danger
                                type='primary'
                                onClick={() => onRemovePdf(healthRecord?.path)}>
                                Remove PDF
                            </Button>
                        </div>
                    </ConditionalRender>
                </>
            ),
        }
    })

    const mainTabItems = [
        {
            label: 'Images',
            key: '1',
            children: (
                <ConditionalRender
                    condition={images?.length > 0}
                    elseComponent={
                        <p
                            className='login-text'
                            style={{ paddingLeft: '1%', fontSize: '1rem' }}>
                            No images uploaded
                        </p>
                    }>
                    <ImageGallery
                        images={images?.map(
                            (healthRecord) => baseURL + healthRecord?.path
                        )}
                        onRemoveImage={onRemoveImage}
                    />
                </ConditionalRender>
            ),
        },
        {
            label: 'PDFs',
            key: '2',
            children: (
                <ConditionalRender
                    condition={pdfs?.length > 0}
                    elseComponent={
                        <p
                            className='login-text'
                            style={{ paddingLeft: '1%', fontSize: '1rem' }}>
                            No pdfs uploaded
                        </p>
                    }>
                    <Tabs
                        defaultActiveKey='1'
                        tabPosition='left'
                        items={pdfTabItems}></Tabs>
                </ConditionalRender>
            ),
        },
    ]

    return (
        <div className='sub-container tabbedImagesAndPDF'>
            <h2>Uploaded Medical History</h2>
            <Tabs defaultActiveKey='1' type='card' items={mainTabItems}></Tabs>
        </div>
    )
}
export default ViewUploadedRecords
