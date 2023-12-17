import PrescriptionContext from '../../contexts/SelectedPrescription'
import { useContext, useEffect, useState } from 'react'
import MedicationCard from '../../components/patient/PrescriptionInfo/MedicationCard'
import axiosApi from '../../utils/axiosApi'
import ConditionalRender from '../../components/reusable/ConditionalRender/ConditionalRender'
import {Button, message} from 'antd'

const PrescriptionInfo = () => {
    const { SelectedPrescription, setSelectedPrescription} = useContext(PrescriptionContext)
    const [selectedPatient, setSelectedPatient] = useState({})
    const [prescriptionPrice, setPrescriptionPrice] = useState(0)

    const calculatePrice = async () => {
        try {
            const res = await axiosApi.get(`/patient/get-prescription-price/${SelectedPrescription._id}`)
            setPrescriptionPrice(res.data)
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        const getPatient = async () => {
            try {
                const res = await axiosApi.get(`/patient/get-patient-by-id/${SelectedPrescription.patient_id}`)
                setSelectedPatient(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        getPatient()
    },[SelectedPrescription])

    useEffect(() => {
        calculatePrice()
    }, [SelectedPrescription])

    // Rest of the component code...

    const handlePayWithCard = async () => {
    }


    const handlePayWithWallet = async () => {
        if (selectedPatient.wallet < prescriptionPrice.newPrice) {
            message.error('You don\'t have enough money in your wallet');
            return;
        } else {
            try {
                await axiosApi.post(`/patient/buy-prescription-wallet`, 
                {
                    prescription_id: SelectedPrescription._id,
                    patient_id: SelectedPrescription.patient_id,
                    price: prescriptionPrice.newPrice,
                    paymentMethod: 'wallet'
                });
                message.success('Payment successful');
                setSelectedPrescription(prevState => ({
                    ...prevState,
                    status: 'filled'
                }));
            } catch (error) {
                message.error('Payment failed');
                console.log(error)
            }
        }
    };

    return (
        <div className='page'>
            <div className='primary-container'>
                <h2>Selected Prescription</h2>
                <div className='sub-container'>
                    <h2>{SelectedPrescription.name}</h2>
                    <p>
                        <strong>Doctor: </strong>
                        {SelectedPrescription.doctorName}
                    </p>
                    <p>
                        <strong>Date: </strong>
                        {new Date(SelectedPrescription.date).toDateString()}
                    </p>
                    <p>
                        <strong>Status: </strong>
                        {SelectedPrescription.status}
                    </p>
                    <p>
                        <strong>No. of Medications: </strong>
                        {SelectedPrescription.medications?.length}
                    </p>
                    <p>
                        <strong>Notes: </strong>
                        {SelectedPrescription.notes || 'No notes'}
                    </p>
                </div>
                <div className='sub-container'>
                    <h2>Medications</h2>
                    <div className='medical-history-view'>
                        {SelectedPrescription.medications?.map((medication) => (
                            <MedicationCard
                                key={medication._id}
                                medication={medication}
                            />
                        ))}
                    </div>
                </div>
                {/* <ConditionalRender condition={SelectedPrescription.status === 'unfilled'}>
                <div className='sub-container'>
                    <h2>Purchase prescription</h2>
                    <div>
                        <span><strong>Price: </strong></span>
                        <ConditionalRender condition={prescriptionPrice.oldPrice != prescriptionPrice.newPrice}>
                            <span style={{ textDecoration: 'line-through' }}>{prescriptionPrice.oldPrice}</span>
                            <span> {prescriptionPrice.newPrice}</span>
                        </ConditionalRender>
                        <ConditionalRender condition={prescriptionPrice.oldPrice == prescriptionPrice.newPrice}>
                            <span>{prescriptionPrice.newPrice}</span>
                        </ConditionalRender>
                        <span> EGP</span>
                        <br></br>
                        <Button type='primary' onClick={handlePayWithWallet} style={{margin:'10px 10px 0px 0px'}}>
                            Pay with wallet
                        </Button>
                        <Button type='primary' onClick={handlePayWithCard} style={{marginTop:'10px'}}>
                            Pay with card
                        </Button>
                    </div>
                </div>
                </ConditionalRender> */}
            </div>
        </div>
    )
}
export default PrescriptionInfo
