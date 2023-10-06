import { createContext, useState } from 'react'

const DoctorContext = createContext()

function Provider({ children }) {
    const [SelectedPatient, setSelectedPatient] = useState({})

    return (
        <DoctorContext.Provider value={{ SelectedPatient, setSelectedPatient }}>
            {children}
        </DoctorContext.Provider>
    )
}
export { Provider }
export default DoctorContext
