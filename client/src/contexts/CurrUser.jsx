import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
const CurrUserContext = createContext()
const Provider = ({ children }) => {
    const userType = window.location.pathname.split('/')[1]
    const [currUser, setCurrUser] = useState(null)
    const patientUrl = `http://localhost:3000/api/patient/get-patient-by-id/652185cdf27b074cbbae82bc`
    const drUrl =
        'http://localhost:3000/api/doctor/get-doctor/65219089f27b074cbbae82c4'
    const url =
        userType === 'patient'
            ? patientUrl
            : userType === 'doctor'
            ? drUrl
            : null
    useEffect(() => {
        if (!url) return
        axios
            .get(url)
            .then((res) => {
                setCurrUser(res.data)
            })
            .catch((err) => console.log(err))
    }, [url])
    return (
        <CurrUserContext.Provider value={{ currUser,setCurrUser }}>
            {children}
        </CurrUserContext.Provider>
    )
}
export { Provider }
export default CurrUserContext
