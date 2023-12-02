import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const ForbiddenAccess = () => {
    const navigate = useNavigate()

    const handleNavigateHome = () => {
        navigate('/')
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}>
            <h1>Forbidden Access</h1>
            <p>You do not have permission to access this page.</p>
            <Button type='primary' onClick={handleNavigateHome}>
                Return Home
            </Button>
        </div>
    )
}

export default ForbiddenAccess
