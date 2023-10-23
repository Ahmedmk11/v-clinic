import { Outlet } from 'react-router-dom'
import Layout from '../Layout/Layout'
import { Provider } from '../../contexts/SelectedPatient'

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
