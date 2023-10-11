import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const PrescriptionContext = createContext()

function Provider({ children }) {
    const [SelectedPrescription, setSelectedPrescription] = useState({})
    useEffect(() => {
        let selectedPrescription =
            window.localStorage.getItem('SelectedPrescription') ||
            JSON.stringify({})
        setSelectedPrescription(JSON.parse(selectedPrescription))
    }, [])
    useEffect(() => {
        if (SelectedPrescription._id)
            window.localStorage.setItem(
                'SelectedPrescription',
                JSON.stringify(SelectedPrescription)
            )
    }, [SelectedPrescription])

    return (
        <PrescriptionContext.Provider
            value={{ SelectedPrescription, setSelectedPrescription }}>
            {children}
        </PrescriptionContext.Provider>
    )
}
export { Provider }
export default PrescriptionContext
