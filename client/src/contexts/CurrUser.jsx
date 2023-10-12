import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
const CurrUserContext = createContext()
const Provider = ({ children }) => {
    const [currUser, setCurrUser] = useState(null)
    const id = '65219089f27b074cbbae82c4'
    useEffect(() => {
        if (!currUser) return
        axios
            .get(`http://localhost:3000/api/doctor/get-doctor/${id}`)
            .then((res) => {
                setCurrUser(res.data)
            })
            .catch((err) => console.log(err))
    }, [currUser])
    return (
        <CurrUserContext.Provider value={{ currUser }}>
            {children}
        </CurrUserContext.Provider>
    )
}

export default CurrUserContext
