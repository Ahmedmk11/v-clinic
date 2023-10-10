import axios from 'axios'
import { useState } from 'react'
import './addAdminForm.css'

const addAdminForm = () => {
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://localhost:3000/api/admin/addAdmin',
                {
                    Username,
                    Password,
                }
            )
            setSuccess('User added succesfully')
            setError(null)
            console.log(success)
            setUsername('')
            setPassword('')
        } catch (error) {
            setError(error.response.data.message)
            setSuccess(null)
            console.log(error.response.data.message)
        }
    }

    return (
        <div className='admin-page'>
            <div className='admin-form-container'>
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
