import { useNavigate, Outlet } from 'react-router-dom'
import Layout from '../Layout/Layout'
import { useState } from 'react'
import { Provider } from '../../contexts/SelectedPrescription'

const PatientHome = () => {
    const navigate = useNavigate()
    const [currUser, setCurrUser] = useState(null)

    return (
        <Layout>
            <Provider>
                <Outlet />
            </Provider>
        </Layout>
    )
}

export default PatientHome
