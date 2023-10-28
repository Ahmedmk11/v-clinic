import axios from 'axios'
import { useEffect, useState } from 'react'
import './css/addAdminForm.css'

const addAdminForm = () => {
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        console.log('Username:', Username)
        console.log('Password:', Password)
    }, [Username, Password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:3000/api/admin/addAdmin', {
                Username,
                Password,
                email,
                name,
            })
            setSuccess('User added succesfully')
            setError(null)
            console.log(success)
            setUsername('')
            setPassword('')
            setEmail('')
            setName('')
        } catch (error) {
            setError(error.response.data.message)
            setSuccess(null)
            console.log(error.response.data.message)
        }
    }

    return (
        <div className='page'>
            <div className='primary-container'>
                <h2>Add a new Admin</h2>
                <form className='adminForm' onSubmit={handleSubmit}>
                    <label>
                        <strong>Username:</strong>
                    </label>
                    <input
                        type='text'
                        onChange={(e) => setUsername(e.target.value)}
                        value={Username}
                    />

                    <label>
                        <strong>Password:</strong>
                    </label>
                    <input
                        type='text'
                        onChange={(e) => setPassword(e.target.value)}
                        value={Password}
                    />
                    <label>
                        <strong>Email:</strong>
                    </label>
                    <input
                        type='text'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <label>
                        <strong>Name:</strong>
                    </label>
                    <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />

                    <button className='button' type='submit'>
                        Submit
                    </button>
                    {error ? (
                        <div className='errorAdminForm'>{error}</div>
                    ) : null}
                    {success ? (
                        <div className='successAdminForm'>{success}</div>
                    ) : null}
                </form>
            </div>
        </div>
    )
}

export default addAdminForm
