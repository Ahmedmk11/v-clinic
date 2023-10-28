import './notFound.css'

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

export default NotFound
