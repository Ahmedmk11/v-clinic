import { Outlet } from 'react-router-dom'
import Layout from '../../components/layout/Layout/Layout'

const DoctorMain = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}

export default DoctorMain
