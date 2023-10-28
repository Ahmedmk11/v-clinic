import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom' // Import useLocation
import axios from 'axios'

const CurrUserContext = createContext()

const Provider = ({ children }) => {
    const [userID, setUserID] = useState(null)
    const [currUser, setCurrUser] = useState(null)
    const [role, setRole] = useState(null)

    const location = useLocation()

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/auth/get-curr-user', {
                withCredentials: true,
            })
            .then((res) => {
                console.log('res.data:', res.data)
                setUserID(res.data.userId)
                setRole(res.data.role)
            })
            .catch((err) => console.log(err))
    }, [location])

    useEffect(() => {
        if (userID) {
            let url = `http://localhost:3000/api/${role}/`
            if (role === 'patient') {
                url += 'get-patient-by-id/'
            } else if (role === 'doctor') {
                url += 'get-doctor/'
            } else if (role === 'admin') {
                url += 'get-admin/'
            }
            url += userID

            if (role === 'admin') {
                url += '/admin'
            }

            axios
                .get(url, { withCredentials: true })
                .then((res) => {
                    console.log('res.data:', res.data)
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
