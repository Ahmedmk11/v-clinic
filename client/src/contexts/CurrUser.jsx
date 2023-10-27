import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
const CurrUserContext = createContext()
const Provider = ({ children }) => {
    const [userType, setUserType] = useState(
        window.location.pathname.split('/')[1]
    )
    const [currUser, setCurrUser] = useState(null)

    // const patientUrl = `http://localhost:3000/api/patient/get-patient-by-id/652185cdf27b074cbbae82bc`
    const patientUrl = 'http://localhost:3000/api/auth/get-curr-user'

    const drUrl =
        'http://localhost:3000/api/doctor/get-doctor/65219089f27b074cbbae82c0'

    const url =
        userType === 'patient'
            ? patientUrl
            : userType === 'doctor'
            ? drUrl
            : null

    useEffect(() => {
        if (!url) return
        axios
            .get(url, { withCredentials: true })
            .then((res) => {
                console.log('res.data:', res.data)
                setCurrUser(res.data.userId)
            })
            .catch((err) => console.log(err))
    }, [userType])

    return (
        <CurrUserContext.Provider
            value={{ currUser, setCurrUser, setUserType, userType }}>
            {children}
        </CurrUserContext.Provider>
    )
}
export { Provider }
export default CurrUserContext
