import { useEffect, useState, useContext } from 'react'
import ViewPrescriptionsList from '../../components/patient/ViewPrescriptions/ViewPrescriptionsList'
import CurrUserContext from '../../contexts/CurrUser'
import axiosApi from '../../utils/axiosApi'
const PatientViewPrescription = () => {
    const { currUser } = useContext(CurrUserContext)
    const [prescriptions, setPrescriptions] = useState([])
    useEffect(() => {
        if (!currUser) return
        axiosApi
            .get('/patient/get-patient-prescriptions/' + currUser?._id)
            .then((res) => {
                setPrescriptions(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [currUser])

    return (
        <div className='page'>
            <ViewPrescriptionsList prescriptions={prescriptions} />
        </div>
    )
}

export default PatientViewPrescription
