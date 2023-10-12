import { createContext, useState, useEffect } from 'react'

const SelectedPatientContext = createContext()

function Provider({ children }) {
    const [SelectedPatient, setSelectedPatient] = useState({})
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
        <SelectedPatientContext.Provider
            value={{ SelectedPatient, setSelectedPatient}}>
            {children}
        </SelectedPatientContext.Provider>
    )
}
export { Provider }
export default SelectedPatientContext
