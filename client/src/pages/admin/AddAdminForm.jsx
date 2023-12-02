import { useEffect, useState } from 'react'
import './css/addAdminForm.css'
import axiosApi from '../../utils/axiosApi'
import { Form, Input, Button, message } from 'antd'

const AddAdminForm = ({ setAdmins, setIsOpen }) => {
    const [form] = Form.useForm()
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const handleSubmit = async (e) => {
        try {
            await axiosApi.post('/admin/addAdmin', {
                Username,
                Password,
                email,
                name,
            })
            setUsername('')
            setPassword('')
            setEmail('')
            setName('')
            setIsOpen(false)
            let res = await axiosApi.get('/admin/getAllAdmins')
            if (res.length !== 0) setAdmins(res.data)
            console.log('Admins', res.data)
            message.success('Admin added successfully')
        } catch (error) {
            message.error('Error adding admin')
            console.log(error.response.data.message)
        }
    }

    return (
        <div>
            <Form className='adminForm' form={form} onFinish={handleSubmit}>
                <Form.Item label={<strong>Username</strong>} name='username'>
                    <Input
                        autoComplete='new-username'
                        onChange={(e) => setUsername(e.target.value)}
                        value={Username}
                    />
                </Form.Item>

                <Form.Item label={<strong>Password</strong>} name='password'>
                    <Input.Password
                        autoComplete='new-password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={Password}
                    />
                </Form.Item>

                <Form.Item label={<strong>Email</strong>} name='email'>
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </Form.Item>

                <Form.Item label={<strong>Name</strong>} name='name'>
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
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

export default AddAdminForm
