import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const Login = () => {
    const navigate = useNavigate()
    const [Username, setUsername] = useState('')
    const handleLogin = (event) => {
        event.preventDefault()
        navigate(`/${Username}`)
    }
    return (
        <div style={{ height: '100px', textAlign: 'center', fontSize: '4rem' }}>
            <form onSubmit={handleLogin}>
                <input
                    style={{ fontSize: '2rem' }}
                    type='text'
                    placeholder='username'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button style={{ fontSize: '2rem' }} type='submit'>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
