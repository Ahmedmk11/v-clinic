import { Outlet } from 'react-router-dom'
import Layout from '../../components/layout/Layout/Layout'

const AdminMain = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}

export default AdminMain
