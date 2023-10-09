import { Outlet } from 'react-router-dom'
import Layout from '../Layout/Layout'

const AdminMain = () => {
    return (
        <Layout>
                <Outlet />
        </Layout>
    )
}

export default AdminMain
