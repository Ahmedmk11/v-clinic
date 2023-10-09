import { Link } from 'react-router-dom'

const AdminHome = () => {
    return (
        <div className='viewPatients-page'>
            <div className='patient-list-conatiner'>
                <Link to='/admin/add-admin'>
                    <h2>Add Adminstrator</h2>
                </Link>
                <Link to='/admin/add-package'>
                    <h2>Add Package</h2>
                </Link>
                <Link to='/admin/view-patients'>
                    <h2>View Patients</h2>
                </Link>
                <Link to='/admin/view-doctors'>
                    <h2>View Doctors</h2>
                </Link>
                <Link to='/admin/view-admins'>
                    <h2>View Adminstrators</h2>
                </Link>
                <Link to='/admin/view-requests'>
                    <h2>View Dr Requests</h2>
                </Link>
            </div>
        </div>
    )
}

export default AdminHome
