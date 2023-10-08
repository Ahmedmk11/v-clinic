import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const DoctorContext = createContext()

function Provider({ children }) {
    const [SelectedPatient, setSelectedPatient] = useState({})
    const [Doctor, setDoctor] = useState({})
    const id = '65219089f27b074cbbae82c4'
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/doctor/get-doctor/${id}`)
            .then((res) => {
                setDoctor(res.data)
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }, [])
    useEffect(() => {
        let selectedPatient =
            window.localStorage.getItem('SelectedPatient') || JSON.stringify({})
        setSelectedPatient(JSON.parse(selectedPatient))
    }, [])
    useEffect(() => {
        if (SelectedPatient._id)
            window.localStorage.setItem(
                'SelectedPatient',
                JSON.stringify(SelectedPatient)
            )
    }, [SelectedPatient])

    return (
        <DoctorContext.Provider
            value={{ SelectedPatient, setSelectedPatient, Doctor, setDoctor }}>
            {children}
        </DoctorContext.Provider>
    )
}
export { Provider }
export default DoctorContext
