import {Link} from 'react-router-dom'

const AdminHome = () => {
    return (
        <div className="adminHome">
            <Link to='/admin/add-admin'>
                <h2>Add Adminstrator</h2>
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
        </div>
    )
}

export default AdminHome