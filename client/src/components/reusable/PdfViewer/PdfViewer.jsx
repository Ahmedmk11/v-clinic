import { Worker, Viewer ,pdfjs} from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'


const PdfViewer = ({ pdfUrl }) => {
    const renderToolbar = (Toolbar) => (
        <Toolbar>
            {(slots) => {
                const {
                    CurrentPageInput,
                    EnterFullScreen,
                    NumberOfPages,
                    Zoom,
                    ZoomIn,
                    ZoomOut,
                    SwitchTheme,
                } = slots
                return (
                    <div
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            width: '100%',
                        }}>
                        <div style={{ padding: '0px 4px', width: '2rem' }}>
                            <CurrentPageInput />
                        </div>
                        <div style={{ padding: '0px 4px' }}>
                            Out of <NumberOfPages />
                        </div>
                        <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                            <ZoomOut />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                            <Zoom />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                            <ZoomIn />
                        </div>
                        <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                            <SwitchTheme />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                            <EnterFullScreen />
                        </div>
                    </div>
                )
            }}
        </Toolbar>
    )

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        renderToolbar,
        sidebarTabs: (defaultTabs) => [
            defaultTabs[0], // Thumbnails tab
        ],
    })
    return (
        <>
            {pdfUrl && (
                <div style={{ width: '100%', height: '600px' }}>
                    <Worker
                        workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
                        <Viewer
                            fileUrl={
                                pdfUrl
                            }
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </Worker>
                </div>
            )}
            {!pdfUrl && <h4>No file to show</h4>}
        </>
    )
}

export default PdfViewer
