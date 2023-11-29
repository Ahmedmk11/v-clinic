import {
    Modal,
    Button,
    Form,
    DatePicker,
    TimePicker,
    message,
    Input,
    Select,
} from 'antd'
import './AppointmentPrescription.css'
import { CloseOutlined } from '@ant-design/icons'
import axiosApi from '../../../utils/axiosApi'
import disabledDate from '../../../utils/disabledDate'
import { useState, useEffect } from 'react'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
const AppointmentPrescription = ({
    Appointment,
    setAppointments,
    showModal,
    setShowModal,
}) => {
    const [form] = Form.useForm()
    const [currMedicines, setCurrMedicines] = useState(null)
    const [allMedicines, setAllMedicines] = useState([]) // [ {name: 'med1', id: '1'}, {name: 'med2', id: '2'}
    const [medicines, setMedicines] = useState(null)
    const [addMedicine, setAddMedicine] = useState(false)
    const [hasPrescription, setHasPrescription] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosApi.get('/doctor/get-all-medicines')
                setMedicines(response.data)
                //console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosApi.get(
                    `/appointment/get-prescription/${Appointment._id}`
                )
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

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
            // console.log(values)
            // console.log(currMedicines)
            //console.log(getMedicine.data)
            setAllMedicines((prev) => {
                return [
                    ...prev,
                    {
                        medicine: medicineName,
                        Dosage,
                        Frequency,
                        Duration,
                        notes,
                        medicine_id: getMedicine.data[0]._id,
                    },
                ]
            })
            console.log(allMedicines)
            setAddMedicine(false)
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
        } catch (errorInfo) {
            console.log('Failed:', errorInfo)
            message.error('Error adding prescription')
        }
    }

    // const onFinish = async () => {
    //     try {
    //         const values = await form.validateFields()
    //         const { date, start_time, end_time, ...restValues } = values
    //         const startDate = new Date(date) // Convert date string to Date object

    //         // Set the date part of start_time and end_time to match the 'date' field
    //         const startTime = new Date(start_time)
    //         startTime.setFullYear(startDate.getFullYear())
    //         startTime.setMonth(startDate.getMonth())
    //         startTime.setDate(startDate.getDate())

    //         const endTime = new Date(end_time)
    //         endTime.setFullYear(startDate.getFullYear())
    //         endTime.setMonth(startDate.getMonth())
    //         endTime.setDate(startDate.getDate())

    //         // Pass the updated values to onCreate
    //   await axiosApi.patch(`/appointment/reschedule-appointment`,{
    //             appointmentId: Appointment._id,
    //             date: startDate.toISOString(),
    //             start_time: startTime.toISOString(),
    //             end_time: endTime.toISOString()
    //         })
    //     setAppointments((prev) => {
    //             return prev.map((appointment) => {
    //                 if (appointment._id === Appointment._id) {
    //                     return {
    //                         ...appointment,
    //                         date: startDate.toISOString(),
    //                         start_time: startTime.toISOString(),
    //                         end_time: endTime.toISOString(),
    //                         status: 'rescheduled',
    //                     }
    //                 }
    //                 return appointment
    //             })
    //         })
    //         closeModal()
    //         form.resetFields()
    //         message.success('Appointment rescheduled')
    //     } catch (errorInfo) {
    //         console.log('Failed:', errorInfo)
    //         message.error('Error rescheduling appointment')
    //     }
    // }

    return (
        <Modal
            open={showModal}
            okText='Add'
            title={`Prescription for ${Appointment.patient_id.name}`}
            onCancel={closeModal}
            destroyOnClose
            footer={[
                <div key='footerDiv'>
                    <Button key='cancel-button' onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button
                        key='next-button0'
                        type='primary'
                        onClick={handleSubmitPrescription}>
                        Edit Prescrition
                    </Button>
                </div>,
            ]}>
            <Form form={form} layout='vertical' name='create_appointment_form'>
                {/* <Form.Item
            name='date'
            label='Date'
            rules={[
                {
                    required: true,
                    message: 'Please select the date!',
                },
            ]}>
            <DatePicker  disabledDate={disabledDate} style={{ width: '100%' }} />
        </Form.Item> */}
                {/* <Form.Item
            name='start_time'
            label='Start Time'
            rules={[
                {
                    required: true,
                    message: 'Please select the start time!',
                },
            ]}>
            <TimePicker format='HH:mm' />
        </Form.Item> */}
                <label
                    style={{
                        marginTop: '5px',
                        fontWeight: 600,
                        fontSize: '15px',
                    }}>
                    {' '}
                    Medications:{' '}
                </label>
                <br></br>
                <ConditionalRender condition={allMedicines?.length > 0}>
                    {allMedicines?.map((medicine) => (
                        <div
                            key={medicine.medicine}
                            style={{
                                display: 'flex',
                                gap: '10px',
                                justifyContent: 'space-between',
                            }}
                            className='listMedicines'>
                            <p style={{ margin: '0px', fontWeight: '700' }}>
                                {medicine.medicine}
                            </p>
                            <p style={{ margin: '0px' }}>
                                <strong>Dosage: </strong>
                                {medicine.Dosage}
                            </p>
                            <p style={{ margin: '0px' }}>
                                <strong>Frequency: </strong>
                                {medicine.Frequency}
                            </p>
                            <p style={{ margin: '0px', padding: '0px' }}>
                                <strong>Duration: </strong>
                                {medicine.Duration}
                            </p>
                            <CloseOutlined
                                onClick={() =>
                                    deleteMedicine(medicine.medicine)
                                }
                            />
                        </div>
                    ))}
                </ConditionalRender>
                <ConditionalRender condition={!addMedicine}>
                    <Button
                        key='add-med-button'
                        type='primary'
                        style={{ marginTop: '3px', marginBottom: '10px' }}
                        onClick={() => setAddMedicine(true)}>
                        Add Medicine
                    </Button>
                </ConditionalRender>
                <ConditionalRender condition={addMedicine}>
                    <Form.Item
                        name='medicineName'
                        label='Select the medicine'
                        style={{
                            width: '200px',
                            marginTop: '1px',
                            marginBottom: '0px',
                            padding: '0px',
                        }}
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
                            style={{ margin: '0px' }}
                            onChange={handleChange}
                            options={medicines?.map((medicine) => ({
                                label: medicine.name,
                                value: medicine.name,
                            }))}
                            //defaultValue={mode=="requests"?['pending']:[]}
                        />
                    </Form.Item>
                    <Form.Item
                        name='Dosage'
                        label='Dosage'
                        style={{
                            width: '200px',
                            marginTop: '1px',
                            marginBottom: '0px',
                            padding: '0px',
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please add the Dosage',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='Frequency'
                        label='Frquency (per day)'
                        style={{
                            width: '200px',
                            marginTop: '1px',
                            marginBottom: '0px',
                            padding: '0px',
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please add the Frequency',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='Duration'
                        label='Duration (in days)'
                        style={{
                            width: '200px',
                            marginTop: '1px',
                            marginBottom: '0px',
                            padding: '0px',
                        }}
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please add the number of days for this medicine',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Button
                        key='add-med-button'
                        type='primary'
                        style={{ marginTop: '3px', marginBottom: '10px' }}
                        onClick={handleAddMedicine}>
                        Done
                    </Button>
                    <br></br>
                </ConditionalRender>
                <Form.Item
                    name='notes'
                    label='Extra Notes (if any)'
                    rules={[
                        {
                            message: 'Write any extra notes here',
                        },
                    ]}>
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AppointmentPrescription
