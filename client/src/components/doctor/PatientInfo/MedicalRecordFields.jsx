import { Form, Input, DatePicker, Select } from 'antd'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'
import {
    medicationOptions,
    conditionsOptions,
} from '../../../utils/medicalRecordOptions'
const { Option } = Select

const MedicalRecordFields = ({ medicalRecordType }) => {
    return (
        <>
            <ConditionalRender
                condition={medicalRecordType === 'chronicConditions'}>
                <h3 className='main-text' style={{ textAlign: 'center' }}>
                    Chronic Conditions
                </h3>
                <Form.Item
                    name='name'
                    label='Condition Name'
                    rules={[
                        { required: true, message: 'Please enter a name' },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name='diagnosedDate'
                    label='Diagnosed Date'
                    rules={[
                        {
                            required: true,
                            message: 'Please select a diagnosed date',
                        },
                    ]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    name='medications'
                    label='Medications'
                    rules={[
                        {
                            required: true,
                            message: 'Please enter medications',
                            type: 'array',
                        },
                    ]}>
                    <Select
                        mode='tags'
                        placeholder='Select or enter medications'>
                        {medicationOptions.map((option, i) => (
                            <Option
                                key={option + i + '0390'}
                                value={option}
                                label={option}>
                                {option}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item required name='notes' label='Notes'>
                    <Input.TextArea />
                </Form.Item>
            </ConditionalRender>
            <ConditionalRender condition={medicalRecordType === 'surgeries'}>
                <h3 style={{ textAlign: 'center' }}>Surgeries</h3>
                <Form.Item
                    name='name'
                    label='Surgery Name'
                    rules={[
                        { required: true, message: 'Please enter a name' },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name='date'
                    label='Surgery Date'
                    rules={[
                        {
                            required: true,
                            message: 'Please select a surgery date',
                        },
                    ]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item name='notes' label='Notes'>
                    <Input.TextArea />
                </Form.Item>
            </ConditionalRender>
            <ConditionalRender condition={medicalRecordType === 'allergies'}>
                <h3 style={{ textAlign: 'center' }}>Allergies</h3>
                <Form.Item
                    name='name'
                    label='Allergy Name'
                    rules={[
                        { required: true, message: 'Please enter a name' },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name='reaction'
                    label='Reaction'
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the reaction',
                        },
                    ]}>
                    <Input />
                </Form.Item>
            </ConditionalRender>
            <ConditionalRender
                condition={medicalRecordType === 'familyHistory'}>
                <h3 style={{ textAlign: 'center' }}>Family History</h3>
                <Form.Item
                    name='relation'
                    label='Relation'
                    rules={[
                        { required: true, message: 'Please select a relation' },
                    ]}>
                    <Select placeholder='Select Relation'>
                        <Option value='parents'>Parents</Option>
                        <Option value='siblings'>Siblings</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name='conditionName'
                    label='Condition Name'
                    rules={[
                        {
                            required: true,
                            message: 'Please select a condition',
                        },
                    ]}>
                    <Select placeholder='Select Condition'>
                        {conditionsOptions.map((condition) => (
                            <Option key={condition} value={condition}>
                                {condition}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </ConditionalRender>
            <ConditionalRender condition={medicalRecordType === 'lifestyle'}>
                <h3 style={{ textAlign: 'center' }}>Lifestyle</h3>
                <Form.Item
                    name='aspect'
                    label='Lifestyle Aspect'
                    rules={[
                        {
                            required: true,
                            message: 'Please select a lifestyle aspect',
                        },
                    ]}>
                    <Select placeholder='Select Aspect'>
                        <Option value='smoking'>Smoking</Option>
                        <Option value='alcoholConsumption'>
                            Alcohol Consumption
                        </Option>
                        <Option value='exerciseFrequency'>
                            Exercise Frequency
                        </Option>
                        <Option value='diet'>Diet</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name='note'
                    label='Note'
                    rules={[
                        {
                            required: true,
                            message:
                                'Please enter a note related to the selected lifestyle aspect',
                        },
                    ]}>
                    <Input.TextArea />
                </Form.Item>
            </ConditionalRender>
        </>
    )
}

export default MedicalRecordFields
