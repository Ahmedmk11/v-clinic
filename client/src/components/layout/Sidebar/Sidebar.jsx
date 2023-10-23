import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    HomeOutlined,
    TeamOutlined,
    ScheduleOutlined,
    UserAddOutlined,
    EyeOutlined,
    FileSyncOutlined,
    FilePptOutlined,
    PlusOutlined,
} from '@ant-design/icons'
import './sidebar.css'

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const navigate = useNavigate()
    const page = window.location.pathname.split('/').pop()
    const userType = window.location.pathname.split('/')[1]
    const [showAdminSublist, setShowAdminSublist] = useState(false)
    const [showPackageSublist, setShowPackageSublist] = useState(false)

    return (
        <div
            className={`sidebar ${isExpanded ? 'sidebar-expanded' : ''}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}>
            <div>
                <p
                    className={
                        page === 'doctor' ||
                        page === 'patient' ||
                        page === 'admin'
                            ? 'sidebar-item selected-sidebar-item'
                            : 'sidebar-item'
                    }
                    onClick={() => {
                        navigate(`/${userType}`)
                    }}>
                    <HomeOutlined />
                    {isExpanded ? 'Home' : ''}
                </p>
                {userType === 'patient' && ( // to be changed when adding more patient pages
                    <p
                        className={
                            page === 'view-prescriptions'
                                ? 'sidebar-item selected-sidebar-item'
                                : 'sidebar-item'
                        }
                        onClick={() => {
                            navigate('view-prescriptions')
                        }}>
                        <strong>VP</strong>
                        {isExpanded ? 'Prescriptions' : ''}
                    </p>
                )}
                {userType === 'doctor' && ( // to be changed when adding more patient pages
                    <p
                        className={
                            page === 'patients'
                                ? 'sidebar-item selected-sidebar-item'
                                : 'sidebar-item'
                        }
                        onClick={() => {
                            navigate('patients')
                        }}>
                        <TeamOutlined />
                        {isExpanded ? 'Patients' : ''}
                    </p>
                )}
                {(userType === 'doctor' || userType === 'patient') && (
                    <p
                        className={
                            page === 'appointments'
                                ? 'sidebar-item selected-sidebar-item'
                                : 'sidebar-item'
                        }
                        onClick={() => {
                            navigate('appointments')
                        }}>
                        <ScheduleOutlined />
                        {isExpanded ? 'Appointments' : ''}
                    </p>
                )}
                {userType === 'admin' && (
                    <>
                        <p
                            className={
                                page === 'add-admin'
                                    ? 'sidebar-item selected-sidebar-item'
                                    : 'sidebar-item'
                            }
                            onClick={() => {
                                navigate('add-admin')
                            }}>
                            <UserAddOutlined />
                            {isExpanded ? 'Add Admin' : ''}
                        </p>
                        <p
                            className={
                                page === 'view-requests'
                                    ? 'sidebar-item selected-sidebar-item'
                                    : 'sidebar-item'
                            }
                            onClick={() => {
                                navigate('view-requests')
                            }}>
                            <FileSyncOutlined />
                            {isExpanded ? 'View Requests' : ''}
                        </p>
                        <p
                            className={
                                (showPackageSublist && isExpanded) ||
                                page === 'add-package' ||
                                page === 'view-packages'
                                    ? 'sidebar-item selected-sidebar-item'
                                    : 'sidebar-item'
                            }
                            onClick={() =>
                                setShowPackageSublist(!showPackageSublist)
                            }>
                            <FilePptOutlined />
                            {isExpanded ? 'Packages' : ''}
                        </p>
                        {showPackageSublist && isExpanded && (
                            <div className='sublist'>
                                <p
                                    className={
                                        page === 'add-package'
                                            ? 'sidebar-item selected-sidebar-item'
                                            : 'sidebar-item'
                                    }
                                    onClick={() => {
                                        navigate('add-package')
                                    }}>
                                    <PlusOutlined />
                                    {isExpanded ? 'Add Package' : ''}
                                </p>
                                <p
                                    className={
                                        page === 'view-packages'
                                            ? 'sidebar-item selected-sidebar-item'
                                            : 'sidebar-item'
                                    }
                                    onClick={() => {
                                        navigate('view-packages')
                                    }}>
                                    <strong>VD</strong>
                                    {isExpanded ? 'View & Delete' : ''}
                                </p>
                            </div>
                        )}
                        <p
                            className={
                                (showAdminSublist && isExpanded) ||
                                page === 'view-admins' ||
                                page === 'view-patients' ||
                                page === 'view-doctors'
                                    ? 'sidebar-item selected-sidebar-item'
                                    : 'sidebar-item'
                            }
                            onClick={() =>
                                setShowAdminSublist(!showAdminSublist)
                            }>
                            <EyeOutlined />
                            {isExpanded ? 'View & Delete' : ''}
                        </p>
                        {showAdminSublist && isExpanded && (
                            <div className='sublist'>
                                <p
                                    className={
                                        page === 'view-admins'
                                            ? 'sidebar-item selected-sidebar-item'
                                            : 'sidebar-item'
                                    }
                                    onClick={() => {
                                        navigate('view-admins')
                                    }}>
                                    <strong>A</strong>
                                    {isExpanded ? 'View Admins' : ''}
                                </p>
                                <p
                                    className={
                                        page === 'view-patients'
                                            ? 'sidebar-item selected-sidebar-item'
                                            : 'sidebar-item'
                                    }
                                    onClick={() => {
                                        navigate('view-patients')
                                    }}>
                                    <strong>P</strong>
                                    {isExpanded ? 'View Patients' : ''}
                                </p>
                                <p
                                    className={
                                        page === 'view-doctors'
                                            ? 'sidebar-item selected-sidebar-item'
                                            : 'sidebar-item'
                                    }
                                    onClick={() => {
                                        navigate('view-doctors')
                                    }}>
                                    <strong>Dr</strong>
                                    {isExpanded ? 'View Doctors' : ''}
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Sidebar
