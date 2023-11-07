import { Tabs } from 'antd'
import ImageGallery from '../../reusable/ImageGallery/ImageGallery'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import PdfViewer from '../../reusable/PdfViewer/PdfViewer'
import './viewUploadedRecords.css'

const { TabPane } = Tabs

const ViewUploadedRecords = ({ Patient }) => {
    const images = Patient?.health_records?.filter(
        (healthRecord) => !healthRecord?.path?.toLowerCase().includes('.pdf')
    )

    const pdfs = Patient?.health_records?.filter((healthRecord) =>
        healthRecord?.path?.toLowerCase().includes('.pdf')
    )

    return (
        <div className='sub-container tabbedImagesAndPDF'>
            <h2>Uploaded Medical History</h2>
            <Tabs defaultActiveKey='1' type='card'>
                <TabPane tab='Images' key='1'>
                    <ConditionalRender
                        condition={images?.length > 0}
                        elseComponent={
                            <p style={{ paddingLeft: '1%', fontSize: '1rem' }}>
                                No images uploaded
                            </p>
                        }>
                        <ImageGallery
                            images={images?.map(
                                (healthRecord) =>
                                    'http://localhost:3000/api/' +
                                    healthRecord?.path
                            )}
                        />
                    </ConditionalRender>
                </TabPane>
                <TabPane tab='PDFs' key='2'>
                    <ConditionalRender
                        condition={pdfs?.length > 0}
                        elseComponent={
                            <p style={{ paddingLeft: '1%', fontSize: '1rem' }}>
                                No pdfs uploaded
                            </p>
                        }>
                        <Tabs defaultActiveKey='1' tabPosition='left'>
                            {pdfs?.map((healthRecord, i) => (
                                <TabPane
                                    className='patient-info'
                                    tab={healthRecord?.originalname}
                                    key={i + 'healthRecord'}>
                                    <PdfViewer
                                        pdfUrl={
                                            'http://localhost:3000/api/' +
                                            healthRecord?.path
                                        }
                                    />
                                </TabPane>
                            ))}
                        </Tabs>
                    </ConditionalRender>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default ViewUploadedRecords
