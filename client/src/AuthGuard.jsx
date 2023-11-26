import React from 'react'
import { Navigate } from 'react-router-dom'

const LoginGuard = ({ isAuthenticated, role, children }) => {
    if (!isAuthenticated) {
        return children
    } else {
        if (role === 'patient') {
            return <Navigate to='/patient' />
        } else if (role === 'doctor') {
            return <Navigate to='/doctor' />
        } else if (role === 'admin') {
            return <Navigate to='/admin' />
        }
    }
}

const PatientGuard = ({ isAuthenticated, role, children }) => {
    if (isAuthenticated != null || role != '') {
        if (isAuthenticated && role === 'patient') {
            return children
        } else if (!isAuthenticated) {
            return <Navigate to='/login' />
        } else if (role !== 'patient') {
            return <Navigate to='/forbidden-access' />
        }
    }
}

const DoctorGuard = ({ isAuthenticated, role, children }) => {
    if (isAuthenticated != null || role != '') {
        if (isAuthenticated && role === 'doctor') {
            return children
        } else if (!isAuthenticated) {
            return <Navigate to='/login' />
        } else if (role !== 'doctor') {
            return <Navigate to='/forbidden-access' />
        }
    }
}

const AdminGuard = ({ isAuthenticated, role, children }) => {
    if (isAuthenticated != null || role != '') {
        if (isAuthenticated && role === 'admin') {
            return children
        } else if (!isAuthenticated) {
            return <Navigate to='/login' />
        } else if (role !== 'admin') {
            return <Navigate to='/forbidden-access' />
        }
    }
}

export { LoginGuard, PatientGuard, DoctorGuard, AdminGuard }
