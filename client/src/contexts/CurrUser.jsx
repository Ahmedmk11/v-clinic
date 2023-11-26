import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom' // Import useLocation
import axiosApi, { baseURL } from '../utils/axiosApi'

const CurrUserContext = createContext()

const Provider = ({ children }) => {
    const [userID, setUserID] = useState(null)
    const [currUser, setCurrUser] = useState(null)
    const [role, setRole] = useState(null)

    const location = useLocation()

    useEffect(() => {
        axiosApi
            .get('/auth/get-curr-user', {
                withCredentials: true,
            })
            .then((res) => {
                setUserID(res.data.userId)
                setRole(res.data.role)
            })
            .catch((err) => console.log(err))
    }, [location])

    useEffect(() => {
        if (userID) {
            let url = baseURL+role+'/'
            if (role === 'patient') {
                url += 'get-patient-by-id/'
            } else if (role === 'doctor') {
                url += 'get-doctor/'
            } else if (role === 'admin') {
                url += 'getUser/'
            }
            url += userID

            if (role === 'admin') {
                url += '/admin'
            }

            axiosApi
                .get(url)
                .then((res) => {
                    setCurrUser(res.data)
                })
                .catch((err) => console.log(err))
        }
    }, [userID])

    return (
        <CurrUserContext.Provider
            value={{ currUser, setCurrUser, setRole, role }}>
            {children}
        </CurrUserContext.Provider>
    )
}

export { Provider }
export default CurrUserContext
