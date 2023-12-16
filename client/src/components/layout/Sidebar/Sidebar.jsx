import { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    HomeOutlined,
    TeamOutlined,
    ScheduleOutlined,
    MedicineBoxOutlined,
    FileAddOutlined,
    ArrowLeftOutlined,
} from '@ant-design/icons'
import './sidebar.css'

import adminIcn from '../../../assets/icons/admin.svg'
import doctorIcn from '../../../assets/icons/doctor.svg'
import patientIcn from '../../../assets/icons/patient.svg'
import packageIcn from '../../../assets/icons/package.svg'

import adminIcn2 from '../../../assets/icons/dark/admin2.svg'
import doctorIcn2 from '../../../assets/icons/dark/doctor2.svg'
import patientIcn2 from '../../../assets/icons/dark/patient2.svg'
import packageIcn2 from '../../../assets/icons/dark/package2.svg'
import CurrTheme from '../../../contexts/CurrTheme'

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const page = window.location.pathname.split('/').pop()
    const userType = window.location.pathname.split('/')[1]
    const { theme, setTheme } = useContext(CurrTheme)

    const [active, setActive] = useState([
        page === 'view-admins',
        page === 'view-doctors',
        page === 'view-patients',
        page === 'view-packages',
    ])

    useEffect(() => {
        setActive([
            page === 'view-admins',
            page === 'view-doctors',
            page === 'view-patients',
            page === 'view-packages',
        ])
    }, [location])

    const AdminIcon = () => (
        <img
            style={{ width: 24, height: 24 }}
            src={
                theme === 'light' ? adminIcn : active[0] ? adminIcn : adminIcn2
            }
        />
    )
    const DoctorIcon = () => (
        <img
            style={{ width: 24, height: 24 }}
            src={
                theme === 'light'
                    ? doctorIcn
                    : active[1]
                    ? doctorIcn
                    : doctorIcn2
            }
        />
    )
    const PatientIcon = () => (
        <img
            style={{ width: 24, height: 24 }}
            src={
                theme === 'light'
                    ? patientIcn
                    : active[2]
                    ? patientIcn
                    : patientIcn2
            }
        />
    )
    const PackageIcon = () => (
        <img
            style={{ width: 24, height: 24 }}
            src={
                theme === 'light'
                    ? packageIcn
                    : active[3]
                    ? packageIcn
                    : packageIcn2
            }
        />
    )

    return (
        <div className={`sidebar ${isExpanded ? 'sidebar-expanded' : ''}`}>
            <div>
                <div
                   >
                    <p
                        className={'sidebar-item'}
                        onClick={() => {
                            window.history.back()
                        }}>
                        <ArrowLeftOutlined />
                        {isExpanded ? 'Back' : ''}
                    </p>
                </div>
                <div
                    onMouseEnter={() => setIsExpanded(true)}
                    onMouseLeave={() => setIsExpanded(false)}>
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
                        <>
                            <p
                                className={
                                    page === 'view-health-records'
                                        ? 'sidebar-item selected-sidebar-item'
                                        : 'sidebar-item'
                                }
                                onClick={() => {
                                    navigate('view-health-records')
                                }}>
                                <FileAddOutlined />
                                {isExpanded ? 'Health Records' : ''}
                            </p>
                            <p
                                id='pills-icon'
                                className={
                                    page === 'view-prescriptions'
                                        ? 'sidebar-item selected-sidebar-item'
                                        : 'sidebar-item'
                                }
                                onClick={() => {
                                    navigate('view-prescriptions')
                                }}>
                                <MedicineBoxOutlined />
                                {isExpanded ? 'Prescriptions' : ''}
                            </p>
                        </>
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
                                onMouseEnter={() => {
                                    setActive([
                                        true,
                                        page === 'view-doctors',
                                        page === 'view-patients',
                                        page === 'view-packages',
                                    ])
                                }}
                                onMouseLeave={() => {
                                    setActive([
                                        page === 'view-admins',
                                        page === 'view-doctors',
                                        page === 'view-patients',
                                        page === 'view-packages',
                                    ])
                                }}
                                className={
                                    page === 'view-admins'
                                        ? 'sidebar-item selected-sidebar-item'
                                        : 'sidebar-item'
                                }
                                onClick={() => {
                                    navigate('view-admins')
                                }}>
                                <AdminIcon />
                                {isExpanded ? 'Admins' : ''}
                            </p>
                            <p
                                onMouseEnter={() => {
                                    setActive([
                                        page === 'view-admins',
                                        true,
                                        page === 'view-patients',
                                        page === 'view-packages',
                                    ])
                                }}
                                onMouseLeave={() => {
                                    setActive([
                                        page === 'view-admins',
                                        page === 'view-doctors',
                                        page === 'view-patients',
                                        page === 'view-packages',
                                    ])
                                }}
                                className={
                                    page === 'view-doctors'
                                        ? 'sidebar-item selected-sidebar-item'
                                        : 'sidebar-item'
                                }
                                onClick={() => {
                                    navigate('view-doctors')
                                }}>
                                <DoctorIcon />
                                {isExpanded ? 'Doctors' : ''}
                            </p>
                            <p
                                onMouseEnter={() => {
                                    setActive([
                                        page === 'view-admins',
                                        page === 'view-doctors',
                                        true,
                                        page === 'view-packages',
                                    ])
                                }}
                                onMouseLeave={() => {
                                    setActive([
                                        page === 'view-admins',
                                        page === 'view-doctors',
                                        page === 'view-patients',
                                        page === 'view-packages',
                                    ])
                                }}
                                className={
                                    page === 'view-patients'
                                        ? 'sidebar-item selected-sidebar-item'
                                        : 'sidebar-item'
                                }
                                onClick={() => {
                                    navigate('view-patients')
                                }}>
                                <PatientIcon />
                                {isExpanded ? 'Patients' : ''}
                            </p>
                            <p
                                onMouseEnter={() => {
                                    setActive([
                                        page === 'view-admins',
                                        page === 'view-doctors',
                                        page === 'view-patients',
                                        true,
                                    ])
                                }}
                                onMouseLeave={() => {
                                    setActive([
                                        page === 'view-admins',
                                        page === 'view-doctors',
                                        page === 'view-patients',
                                        page === 'view-packages',
                                    ])
                                }}
                                className={
                                    page === 'view-packages'
                                        ? 'sidebar-item selected-sidebar-item'
                                        : 'sidebar-item'
                                }
                                onClick={() => {
                                    navigate('view-packages')
                                }}>
                                <PackageIcon />
                                {isExpanded ? 'Packages' : ''}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
