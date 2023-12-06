import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { DownloadOutlined } from '@ant-design/icons'
import PrescriptionContext from '../../../contexts/SelectedPrescription'
import { Button, message } from 'antd'
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

    const fillCartWithPrescription = async () => {
        try {
            await axiosApi.post(`/cart/prescription/${prescription._id}`, {
                id: currUser._id,
            })
        const newTab = window.open();
        newTab.location.href = 'http://localhost:5173/login?redirect=true';
        } catch (error) {
        message.error(error.response.data.message);
        console.error(error.message);
        }
        
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
        <div className='card' style={{ width: '100%' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <h3>{prescription.name}</h3>
                <Button
                    type='primary'
                    shape='circle'
                    icon={<DownloadOutlined />}
                    size='middle'
                    onClick={handleDownload}
                />
            </div>
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
                <Button type='primary' onClick={fillCartWithPrescription}>
                    Buy Prescription
                </Button>
                <Button type='primary' onClick={handleSelect}>
                    View Prescription
                </Button>
            </div>
        </div>
    )
}
export default PrescriptionCard
