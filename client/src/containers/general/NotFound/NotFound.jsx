import './notFound.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const NotFound = () => {
    return (
        <div className='not-found-container'>
            <div className='error-code'>404</div>
            <h1 className='error-heading'>Page Not Found</h1>
            <p className='error-message'>
                Oops! The page you are looking for might have been removed, had
                its name changed, or is temporarily unavailable.
            </p>
            <p className='home-link'>
                <a href='/'>Go to Home</a>
            </p>
        </div>
    )
}
export const Redirect = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/NotFound')
    }, [])
    return null
}
export default NotFound
