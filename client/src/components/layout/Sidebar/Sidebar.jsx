import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    HomeOutlined,
    TeamOutlined,
    ScheduleOutlined,
    MedicineBoxOutlined,
} from '@ant-design/icons'
import './sidebar.css'
import pillsIcn from '../../../assets/icons/pills.svg'
import adminIcn from '../../../assets/icons/admin.svg'
import doctorIcn from '../../../assets/icons/doctor.svg'
import patientIcn from '../../../assets/icons/patient.svg'
import packageIcn from '../../../assets/icons/package.svg'
import homeIcn from '../../../assets/icons/home.svg'

const PillsIcon = () => <img style={{ width: 24, height: 24 }} src={pillsIcn} />

const AdminIcon = () => <img style={{ width: 24, height: 24 }} src={adminIcn} />
const DoctorIcon = () => (
    <img style={{ width: 24, height: 24 }} src={doctorIcn} />
)
const PatientIcon = () => (
    <img style={{ width: 24, height: 24 }} src={patientIcn} />
)
const PackageIcon = () => (
    <img style={{ width: 24, height: 24 }} src={packageIcn} />
)
const HomeIcon = () => <img style={{ width: 24, height: 24 }} src={homeIcn} />

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
                            <MedicineBoxOutlined />
                            {isExpanded ? 'Health Records' : ''}
                        </p>
                        <p
                            className={
                                page === 'view-prescriptions'
                                    ? 'sidebar-item selected-sidebar-item'
                                    : 'sidebar-item'
                            }
                            onClick={() => {
                                navigate('view-prescriptions')
                            }}>
                            <PillsIcon />
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
    )
}

export default Sidebar
