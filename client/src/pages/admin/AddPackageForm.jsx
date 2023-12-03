import { message, Form, Input, Button } from 'antd'
import axiosApi from '../../utils/axiosApi'
import { useState } from 'react'

const AddPackageForm = ({ setPackages, setIsOpen }) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [sessionDiscount, setSessionDiscount] = useState('')
    const [medicineDiscount, setMedicineDiscount] = useState('')
    const [familySubsDiscount, setFamilySubsDiscount] = useState('')
    const [form] = Form.useForm()

    const handleSubmit = async (e) => {
        try {
            await axiosApi.post('/admin/addPackage', {
                name,
                price,
                sessionDiscount,
                medicineDiscount,
                familySubsDiscount,
            })
            message.success('Package added succesfully')
            setIsOpen(false)
            setName('')
            setPrice('')
            setFamilySubsDiscount('')
            setSessionDiscount('')
            setMedicineDiscount('')

            let res = await axiosApi.get('/admin/getAllPackages')
            if (res.length !== 0) setPackages(res.data)
        } catch (error) {
            if (error.response.data.message) {
                message.error('Something went wrong')
            } else {
                message.error(
                    `Package with name ${error.response.data.keyValue.name} already exists`
                )
            }
        }
    }

    return (
        <div>
            <Form form={form} className='adminForm' onFinish={handleSubmit}>
                <Form.Item label={<strong>Name</strong>} name='name'>
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </Form.Item>

                <Form.Item label={<strong>Price</strong>} name='price'>
                    <Input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                </Form.Item>

                <Form.Item
                    label={<strong>Session Discount</strong>}
                    name='sessionDiscount'>
                    <Input
                        onChange={(e) => setSessionDiscount(e.target.value)}
                        value={sessionDiscount}
                    />
                </Form.Item>

                <Form.Item
                    label={<strong>Medicine Discount</strong>}
                    name='medicineDiscount'>
                    <Input
                        onChange={(e) => setMedicineDiscount(e.target.value)}
                        value={medicineDiscount}
                    />
                </Form.Item>

                <Form.Item
                    label={<strong>Family Subscription Discount</strong>}
                    name='familySubsDiscount'>
                    <Input
                        onChange={(e) => setFamilySubsDiscount(e.target.value)}
                        value={familySubsDiscount}
                    />
                </Form.Item>

                <Form.Item
                    style={{
                        marginLeft: '80%',
                    }}>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddPackageForm
