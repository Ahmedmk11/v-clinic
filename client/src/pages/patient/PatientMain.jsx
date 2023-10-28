import { Outlet } from 'react-router-dom'
import Layout from '../../components/layout/Layout/Layout'
import { Provider } from '../../contexts/SelectedPrescription'

const PatientHome = () => {
    return (
        <Layout>
            <Provider>
                <Outlet />
            </Provider>
        </Layout>
    )
}

export default PatientHome
