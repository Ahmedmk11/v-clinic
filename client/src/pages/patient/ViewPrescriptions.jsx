import { useEffect, useState, useContext } from 'react'
import ViewPrescriptionsList from '../../components/patient/ViewPrescriptions/ViewPrescriptionsList'
import CurrUserContext from '../../contexts/CurrUser'
import axiosApi from '../../utils/axiosApi'
const PatientViewPrescription = () => {
    const { currUser } = useContext(CurrUserContext)
    const [prescriptions, setPrescriptions] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (!currUser) return
        axiosApi
            .get('/patient/get-patient-prescriptions/' + currUser?._id)
            .then((res) => {
                setPrescriptions(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [currUser])

    return (
        <div className='page'>
            <ViewPrescriptionsList loading={loading} prescriptions={prescriptions} />
        </div>
    )
}

export default PatientViewPrescription
