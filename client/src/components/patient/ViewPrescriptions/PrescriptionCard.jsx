import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { DownloadOutlined } from '@ant-design/icons'
import PrescriptionContext from '../../../contexts/SelectedPrescription'
import { Button } from 'antd'
import axiosApi from '../../../utils/axiosApi'
import CurrUserContext from '../../../contexts/CurrUser'
const PrescriptionCard = ({ prescription }) => {
    const { setSelectedPrescription } = useContext(PrescriptionContext)
    const { currUser } = useContext(CurrUserContext)
    const navigate = useNavigate()

    const handleSelect = () => {
        setSelectedPrescription(prescription)
        navigate('/patient/prescription-info')
    }

    const handleDownload = () => {
        console.log('prescription', prescription)
        prescription.patientName = currUser.name
        axiosApi
            .get('/patient/generate-prescription-pdf', {
                params: { prescription },
                responseType: 'arraybuffer',
            })
            .then((res) => {
                console.log(res)
                const blob = new Blob([res.data], { type: 'application/pdf' })
                console.log(blob)
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.setAttribute(
                    'download',
                    `precription_${prescription._id}.pdf`
                )
                document.body.appendChild(link)
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='card'>
            <h3>{prescription.name}</h3>
            <p>
                <strong>Doctor: </strong>
                {prescription.doctorName}
            </p>
            <p>
                <strong>Date: </strong>
                {new Date(prescription.date).toDateString()}
            </p>
            <p>
                <strong>Status: </strong>
                {prescription.status}
            </p>
            <p>
                <strong>No. of Medications: </strong>
                {prescription.medications.length}
            </p>
            <div className='edit-buttons'>
                <Button type='primary' onClick={handleSelect}>
                    View Prescription
                </Button>
                <Button
                    type='primary'
                    shape='circle'
                    icon={<DownloadOutlined />}
                    size='middle'
                    onClick={handleDownload}
                />
            </div>
        </div>
    )
}
export default PrescriptionCard
