import {
    Modal,
    Button,
    Form,
    message,
    Input,
    Select,
} from 'antd'
import './AppointmentPrescription.css'
import { CloseOutlined } from '@ant-design/icons'
import axiosApi from '../../../utils/axiosApi'
import { useState, useEffect } from 'react'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
const AppointmentPrescription = ({
    Appointment,
    setAppointments,
    showModal,
    setShowModal,
}) => {
    const [form] = Form.useForm()
    const [currMedicines, setCurrMedicines] = useState(null);
    const [allMedicines, setAllMedicines] = useState([]); 
    const [medicines, setMedicines] = useState(null);
    const [addMedicine, setAddMedicine] = useState(false);
    const [notes, setNotes] = useState(null);
    const [canEdit, setCanEdit] = useState(true);
    const [prescriptionModified, setPrescriptionModified] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosApi.get('/doctor/get-all-medicines')
                setMedicines(response.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axiosApi.get(`/appointment/get-prescription/${Appointment._id}`);
            console.log(response.data);
            
                response.data.medications.forEach((medication) => {
                    setAllMedicines((prev) => {
                      if (!prev.some((m) => m.medicine_id === medication.medicine_id)) {
                        return [...prev, {
                          medicine: medication.name,
                          Dosage: medication.dosage,
                          Frequency: medication.frequency,
                          Duration: medication.duration,
                          notes: medication.notes,
                          medicine_id: medication.medicine_id
                        }];
                      } else {
                        return prev;
                      }
                    });
                  });
                    form.setFieldsValue({
                        notes: response.data.notes
                    });
                    setNotes(response.data.notes);
                    if (response.data.status == 'unfilled'){
                        setCanEdit(true);
                    }else{
                        setCanEdit(false);
                    }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
        fetchData();
    }, [prescriptionModified]); 

    const handleChange = (value) => {
        setCurrMedicines(value)
    }

    const closeModal = () => {
        setAddMedicine(false)
        setShowModal(false)
    }

    const handleAddMedicine = async () => {
        try {
            const values = await form.validateFields()
            const { medicineName, Dosage, Frequency, Duration, notes } = values
            const getMedicine = await axiosApi.get(
                `/doctor/get-medicine-by-name/${medicineName}`
            )
            if(!allMedicines.some((medicine) => medicine.medicine === medicineName)) {
                setAllMedicines((prev) => { return [...prev, {medicine: medicineName, Dosage, Frequency, Duration, notes, medicine_id: getMedicine.data[0]._id}]})
                setAddMedicine(false)
            }
            else message.error('Medicine already added')
            console.log(allMedicines)
           
        } catch (error) {
            console.log('Failed:', error)
        }
    }

    const deleteMedicine = (medicine) => {
        setAllMedicines((prev) => {
            return prev.filter((med) => med.medicine !== medicine)
        })
    }

    const handleSubmitPrescription = async () => {
        try {
            const values = await form.validateFields()
            const { notes } = values
            const medicines = allMedicines.map((medicine) => {
                return {
                    medicine_id: medicine.medicine_id,
                    dosage: medicine.Dosage,
                    frequency: medicine.Frequency,
                    duration: medicine.Duration,
                    name: medicine.medicine,
                }
            })
            console.log(medicines)
            await axiosApi.post(`/appointment/update-prescription`, {
                appointmentId: Appointment._id,
                prescription: { notes, medications: medicines },
            })
            setAppointments((prev) => {
                return prev.map((appointment) => {
                    if (appointment._id === Appointment._id) {
                        return {
                            ...appointment,
                            status: 'completed',
                        }
                    }
                    return appointment
                })
            })
            closeModal()
            form.resetFields()
            message.success('Prescription added')
            setPrescriptionModified(!prescriptionModified)
        } catch (errorInfo) {
            console.log('Failed:', errorInfo)
            message.error('Error adding prescription')
        }
    }

    return  <Modal
    open={showModal}
    okText='Add'
    title={`Prescription for ${Appointment.patient_id.name}`} 
    onCancel={closeModal}
    footer={[
        <div key="footerDiv">
            <Button
                key='cancel-button'
                onClick={closeModal}>
                Cancel
            </Button>
            <ConditionalRender condition={canEdit}>
            <Button
                key='next-button0'
                type='primary'
                onClick={handleSubmitPrescription}>
                Edit Prescrition
            </Button>
            </ConditionalRender>
        </div>,
    ]}>
 <Form form={form} layout='vertical' name='create_appointment_form'>
         <label style={{ marginTop: '5px',fontWeight: 600,fontSize:'15px' }}> Medications: </label>
        <br></br>
        <ConditionalRender condition={allMedicines?.length>0}>
            {allMedicines?.map((medicine)=>(
                <div key={medicine.medicine} style={{display:'flex', gap:'10px', justifyContent:'space-between'}} className='listMedicines'>
                    <p style={{margin:'0px', fontWeight:'700'}}>{medicine.medicine}</p>
                    <p style={{margin:'0px'}}><strong>Dosage: </strong>{medicine.Dosage}</p>
                    <p style={{margin:'0px'}}><strong>Frequency: </strong>{medicine.Frequency}</p>
                    <p style={{margin:'0px', padding:'0px'}}><strong>Duration: </strong>{medicine.Duration}</p>
                    <ConditionalRender condition={canEdit}>
                    <CloseOutlined  onClick={()=> deleteMedicine(medicine.medicine)}/>
                    </ConditionalRender>
                </div>
            ))}
        </ConditionalRender>
        <ConditionalRender condition={!addMedicine && canEdit}>
            <Button
                key='add-med-button'
                type='primary'
                style={{marginTop:'3px', marginBottom:'10px'}}
                onClick={() => setAddMedicine(true)}>
                Add Medicine
            </Button>
        </ConditionalRender>
        <ConditionalRender condition={addMedicine}>
            <Form.Item
                name='medicineName'
                label='Select the medicine'
                style={{width:'200px', marginTop:'1px',marginBottom:'0px' ,padding:'0px'}}
                rules={[
                    {
                        required: true,
                        message: 'Please add the Medicine name',
                    },
                ]}>
                 <Select
                    className='Select'
                    showSearch
                    allowClear
                    placeholder='Select Medication'
                    style={{margin:'0px'}}
                    onChange={handleChange}
                    options={medicines?.map((medicine)=>({label:medicine.name,value:medicine.name}))}
                />
            </Form.Item> 
            <Form.Item
                name='Dosage'
                label='Dosage'
                style={{width:'200px', marginTop:'1px', marginBottom:'0px', padding:'0px'}}
                rules={[
                    {
                        required: true,
                        message: 'Please add the Dosage',
                    },
                ]}>
                <Input/>
            </Form.Item>
            <Form.Item
                name='Frequency'
                label='Frquency (per day)'
                style={{width:'200px', marginTop:'1px',marginBottom:'0px', padding:'0px'}}
                rules={[
                    {
                        required: true,
                        message: 'Please add the Frequency',
                    },
                ]}>
                <Input/>
            </Form.Item>
            <Form.Item
                name='Duration'
                label='Duration (in days)'
                style={{width:'200px', marginTop:'1px', marginBottom:'0px', padding:'0px'}}
                rules={[
                    {
                        required: true,
                        message: 'Please add the number of days for this medicine',
                    },
                ]}>
                <Input/>
            </Form.Item> 
            <Button
                key='add-med-button'
                type='primary'
                style={{marginTop:'7px', marginBottom:'10px'}}
                onClick={handleAddMedicine}>
                Done
            </Button>
            <Button
                key='add-med-button'
                danger
                type='primary'
                style={{marginTop:'7px', marginBottom:'10px', marginLeft:'10px'}}
                onClick={() => setAddMedicine(false)}>
                Cancel
            </Button>
            <br></br>
        </ConditionalRender>
        <Form.Item
            name='notes'
            label='Extra Notes (if any)'
            initialValue={notes}
            rules={[
                {
                    message: 'Write any extra notes here',
                },
            ]}>
            <Input.TextArea disabled={!canEdit}/>
        </Form.Item>
    </Form> 
</Modal>

}

export default AppointmentPrescription
