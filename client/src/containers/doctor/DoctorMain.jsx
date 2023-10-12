import { Outlet } from 'react-router-dom'
import Layout from '../Layout/Layout'
import { Provider } from '../../context/Doctor'

const DoctorMain = () => {
    return (
        <Layout>
            <Provider>
                <Outlet />
            </Provider>
        </Layout>
    )
}

export default DoctorMain
