import React, { useState } from 'react'
import { Modal, Form, Select, Button, message } from 'antd'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import medicalRecordOptions from '../../../utils/medicalRecordOptions'
import MedicalRecordFields from './MedicalRecordFields'
import axiosApi from '../../../utils/axiosApi'
const { Option } = Select

const AddMedicalRecord = ({
    visible,
    onCancel,
    SelectedPatient,
    setSelectedPatient,
}) => {
    const [page, setPage] = useState(1)
    const [recordType, setRecordType] = useState(null)
    const [form] = Form.useForm()
    const handleTypeChange = (value) => {
        setRecordType(value)
    }

    const handleCancel = () => {
        form.resetFields()
        setPage(1)
        onCancel()
    }

    const handleCreate = async () => {
        let newMedicalHistory = SelectedPatient?.medicalHistory[0]
        try {
            const values = await form.validateFields()
            switch (recordType) {
                case 'chronicConditions':
                    newMedicalHistory?.chronicConditions?.push(values)
                    break
                case 'allergies':
                    newMedicalHistory?.allergies?.push(values)
                    break
                case 'surgeries':
                    newMedicalHistory?.surgeries?.push(values)
                    break
                case 'familyHistory':
                    if (values.relation === 'parents')
                        newMedicalHistory?.familyHistory?.parents?.conditions.push(
                            values.conditionName
                        )
                    else if (values.relation === 'siblings')
                        newMedicalHistory?.familyHistory?.siblings?.conditions.push(
                            values.conditionName
                        )
                    break
                case 'lifestyle':
                    {
                        let lifestyle = { ...newMedicalHistory?.lifestyle }
                        lifestyle = {
                            ...lifestyle,
                            [values.aspect]: values.note,
                        }
                        newMedicalHistory = { ...newMedicalHistory, lifestyle }
                    }
                    break
            }
            updatePatient(newMedicalHistory)
        } catch (error) {
            console.log('Validation failed:', error)
        }
    }

    const updatePatient = (newMedicalHistory) => {
        axiosApi
            .put(`/patient/update-medical-history/${SelectedPatient?._id}`, {
                medicalHistory: newMedicalHistory,
            })
            .then((res) => {
                setSelectedPatient({
                    ...SelectedPatient,
                    medicalHistory: [res.data],
                })
                handleCancel()
                message.success('Medical Record Added')
            })
            .catch((err) => {
                console.log(err)
                message.error('Error Adding Medical Record')
            })
    }

    const renderOptions = () => {
        return medicalRecordOptions.map((option, i) => (
            <Option key={option.value + i + '0284'} value={option.value}>
                {option.label}
            </Option>
        ))
    }

    const Page2Buttons = () => (
        <>
            <Button key='back-button' onClick={() => setPage(1)}>
                Back
            </Button>
            <Button key='add-button' type='primary' onClick={handleCreate}>
                Add
            </Button>
        </>
    )
    return (
        <Modal
            open={visible}
            title='Add Medical Record'
            onCancel={handleCancel}
            width={600}
            footer={[
                <div key='footerdiv8679'>
                    <ConditionalRender
                        condition={page === 1}
                        elseComponent={<Page2Buttons />}>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button
                            key='next-button0'
                            type='primary'
                            onClick={() =>
                                form.validateFields().then(() => setPage(2))
                            }>
                            Next
                        </Button>
                    </ConditionalRender>
                </div>,
            ]}>
            <ConditionalRender condition={page === 1}>
                <Form form={form} layout='vertical'>
                    <Form.Item
                        name='type'
                        label='Record Type'
                        rules={[
                            {
                                required: true,
                                message: 'Please select a record type',
                            },
                        ]}>
                        <Select
                            placeholder='Select a record type'
                            onChange={handleTypeChange}>
                            {renderOptions()}
                        </Select>
                    </Form.Item>
                </Form>
            </ConditionalRender>
            <ConditionalRender condition={page === 2}>
                <Form form={form} layout='vertical'>
                    <MedicalRecordFields medicalRecordType={recordType} />
                </Form>
            </ConditionalRender>
        </Modal>
    )
}

export default AddMedicalRecord
