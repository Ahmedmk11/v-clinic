import { Outlet } from 'react-router-dom'
import Layout from '../Layout/Layout'

const DoctorMain = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}

export default DoctorMain
