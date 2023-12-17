import { Modal, Button, Form, message, Input, Select, Space } from 'antd'
import './AppointmentPrescription.css'
import { CloseOutlined, EditOutlined ,DownloadOutlined} from '@ant-design/icons'
import axiosApi from '../../../utils/axiosApi'
import { useState, useEffect ,useContext} from 'react'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import CurrUserContext from '../../../contexts/CurrUser.jsx'
const AppointmentPrescription = ({
    Appointment,
    setAppointments,
    showModal,
    setShowModal,
}) => {
    const [form] = Form.useForm()
    const [medForm] = Form.useForm()
    const { currUser } = useContext(CurrUserContext)

    const [currMedicines, setCurrMedicines] = useState(null)
    const [allMedicines, setAllMedicines] = useState([])
    const [medicines, setMedicines] = useState(null)
    const [addMedicine, setAddMedicine] = useState(false)
    const [notes, setNotes] = useState(null)
    const [canEdit, setCanEdit] = useState(true)
    const [prescriptionModified, setPrescriptionModified] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editingMedicine, setEditingMedicine] = useState(null)
    const [prescription, setPrescription] = useState(null)

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
                const response = await axiosApi.get(
                    `/appointment/get-prescription/${Appointment._id}`
                )
                console.log(response.data)
                setPrescription(response.data)

                response.data.medications.forEach((medication) => {
                    setAllMedicines((prev) => {
                        if (
                            !prev.some(
                                (m) => m.medicine_id === medication.medicine_id
                            )
                        ) {
                            return [
                                ...prev,
                                {
                                    medicine: medication.name,
                                    Dosage: medication.dosage,
                                    Frequency: medication.frequency,
                                    Duration: medication.duration,
                                    notes: medication.notes,
                                    medicine_id: medication.medicine_id,
                                },
                            ]
                        } else {
                            return prev
                        }
                    })
                })
                form.setFieldsValue({
                    notes: response.data.notes,
                })
                setNotes(response.data.notes)
                if (response.data.status == 'unfilled') {
                    setCanEdit(true)
                } else {
                    setCanEdit(false)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [prescriptionModified])

    const handleChange = (value) => {
        setCurrMedicines(value)
    }

    const closeModal = () => {
        setAddMedicine(false)
        setShowModal(false)
    }

    const handleAddMedicine = async () => {
        try {
            const values = await medForm.validateFields()
            const { medicineName, Dosage, Frequency, Duration, notes } = values
            const getMedicine = await axiosApi.get(
                `/doctor/get-medicine-by-name/${medicineName}`
            )
            if (
                !allMedicines.some(
                    (medicine) => medicine.medicine === medicineName
                )
            ) {
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
                setAddMedicine(false)
                medForm.resetFields()
                message.success('Medicine added')
            } else message.error('Medicine already added')
        } catch (error) {
            console.log('Failed:', error)
            message.error('Error adding medicine')
        }
    }

    const deleteMedicine = async (medicine) => {
        try {
            const response = await axiosApi.delete(
                `/doctor/delete-medication-from-prescription/${Appointment._id}/${medicine._id}`
            )
            medicine = medicine.medicine

            setAllMedicines((prev) => {
                return prev.filter((med) => med.medicine !== medicine)
            })
            message.success('Medicine deleted')
        } catch (error) {
            console.log('Failed:', error)
            message.error('Error deleting medicine')
        }
    }

    const editMedicine = (medicine) => {
        setIsEdit(true)
        medForm.setFieldsValue({
            medicineName: medicine.medicine,
            Dosage: medicine.Dosage,
            Frequency: medicine.Frequency,
            Duration: medicine.Duration,
        })
        setAddMedicine(true)
        setEditingMedicine(medicine)
    }

    const handleEditMedicine = async () => {
        try {
            const values = await medForm.validateFields()
            const { medicineName, Dosage, Frequency, Duration, notes } = values
            console.log(editingMedicine)
            const response = await axiosApi.put(
                `/doctor/edit-medicine-by-name`,
                {
                    medicine_id: editingMedicine.medicine_id,
                    name: medicineName,
                    dosage: Dosage,
                    frequency: Frequency,
                    duration: Duration,
                    aid: Appointment._id,
                }
            )

            response.data?.medications.find((medication) => {
                if (medication.medicine_id === editingMedicine.medicine_id) {
                    setAllMedicines((prev) => {
                        return [
                            ...prev.filter(
                                (medicine) =>
                                    medicine.medicine !==
                                    editingMedicine.medicine
                            ),
                            {
                                medicine: medicineName,
                                Dosage,
                                Frequency,
                                Duration,
                                notes,
                                medicine_id: editingMedicine.medicine_id,
                            },
                        ]
                    })
                }
            })

            setAddMedicine(false)
            setIsEdit(false)
            medForm.resetFields()
        } catch (error) {
            console.log('Failed:', error)
        }
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

    const handleDownload = () => {
        console.log('prescription', Appointment)
        prescription.patientName = Appointment.patient_id.name
        prescription.doctorName = currUser.name
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
        <Modal
            open={showModal}
            okText='Add'
            title={
                <>
                    <span style={{marginRight:"10px"}}>Prescription for {Appointment.patient_id.name}</span>{' '}
                    <Button
                        type='primary'
                        shape='circle'
                        icon={<DownloadOutlined />}
                        size='middle'
                        onClick={handleDownload}
                    />
                </>
            }
            onCancel={closeModal}
            footer={[
                <div key='footerDiv'>
                    <Button key='cancel-button' onClick={closeModal}>
                        Cancel
                    </Button>
                    <ConditionalRender condition={canEdit}>
                        <Button
                            key='next-button0'
                            type='primary'
                            onClick={handleSubmitPrescription}>
                            Save Changes
                        </Button>
                    </ConditionalRender>
                </div>,
            ]}>
            <Form form={form} layout='vertical' name='create_appointment_form'>
                <label
                    className='main-text'
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
                            <EditOutlined
                                style={
                                    !canEdit
                                        ? { color: 'gray', cursor: 'default' }
                                        : null
                                }
                                onClick={() => {
                                    if (canEdit) {
                                        editMedicine(medicine)
                                    }
                                }}
                            />
                            <CloseOutlined
                                style={
                                    !canEdit
                                        ? { color: 'gray', cursor: 'default' }
                                        : null
                                }
                                onClick={() => {
                                    if (canEdit) {
                                        deleteMedicine(medicine)
                                    }
                                }}
                            />
                        </div>
                    ))}
                </ConditionalRender>

                <Button
                    disabled={!(!addMedicine && canEdit)}
                    key='add-med-button'
                    type='primary'
                    style={{ marginTop: '3px', marginBottom: '10px' }}
                    onClick={() => setAddMedicine(true)}>
                    Add Medicine
                </Button>

                <Form
                    form={medForm}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        justifyContent: 'space-between',
                        minHeight: 'fit-content',
                    }}>
                    {addMedicine && (
                        <>
                            <Form.Item
                                name='medicineName'
                                label='Select the medicine'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a medicine',
                                    },
                                ]}
                                style={{
                                    marginBottom: '30px',
                                    minHeight: '60px',
                                }}>
                                <Select
                                    className='Select'
                                    showSearch
                                    allowClear
                                    placeholder='Select Medication'
                                    onChange={handleChange}
                                    options={medicines?.map((medicine) => ({
                                        label: medicine.name,
                                        value: medicine.name,
                                    }))}
                                />
                            </Form.Item>
                            <Form.Item
                                name='Dosage'
                                label='Dosage'
                                style={{
                                    minHeight: '60px',
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
                                label='Frequency (per day)'
                                style={{
                                    minHeight: '60px',
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
                                    minHeight: '60px',
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
                            <Space
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    gap: '10px',
                                    marginTop: '10px',
                                }}>
                                <Button
                                    key='cancel-med-button'
                                    danger
                                    type='primary'
                                    onClick={() => {
                                        setAddMedicine(false)
                                        medForm.resetFields()
                                    }}>
                                    Cancel
                                </Button>
                                <Button
                                    key='add-med-button'
                                    type='primary'
                                    onClick={() => {
                                        if (isEdit) {
                                            handleEditMedicine()
                                        } else {
                                            handleAddMedicine()
                                        }
                                    }}>
                                    {isEdit ? 'Edit' : 'Add'}
                                </Button>
                            </Space>
                        </>
                    )}
                </Form>
                <Form.Item
                    name='notes'
                    label='Notes'
                    initialValue={notes}
                    required
                    rules={[
                        {
                            message:
                                'Write any extra notes here. i.e. when to take the medicine',
                        },
                    ]}>
                    <Input.TextArea disabled={!canEdit} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AppointmentPrescription
