import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeOutlined, TeamOutlined, ScheduleOutlined } from '@ant-design/icons'
import './sidebar.css'

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const navigate = useNavigate()
    const page = window.location.pathname.split('/').pop()
    const userType = window.location.pathname.split('/')[1]

    return (
        <div
            className={`sidebar ${isExpanded ? 'sidebar-expanded' : ''}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}>
            <div>
                <p
                    className={
                        page === 'doctor' || page === 'patient'
                            ? 'sidebar-item selected-sidebar-item'
                            : 'sidebar-item'
                    }
                    onClick={() => {
                        navigate(`/${userType}`)
                    }}>
                    <HomeOutlined />
                    {isExpanded ? 'Home' : ''}
                </p>
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
                {userType === 'doctor' && ( // to be changed when adding more patient pages
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
            </div>
        </div>
    )
}

export default Sidebar
