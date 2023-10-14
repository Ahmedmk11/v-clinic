import { useEffect, useState,useContext } from 'react'
import axios from 'axios'
import ViewPrescriptionsList from '../../components/patient/ViewPrescriptions/ViewPrescriptionsList'
import CurrUserContext from '../../contexts/CurrUser'
const PatientViewPrescription = () => {
    const { currUser } = useContext(CurrUserContext)
    const [prescriptions, setPrescriptions] = useState([])
    useEffect(() => {
        axios
            .get('http://localhost:3000/api/patient/get-patient-prescription/'+currUser?._id)
            .then((res) => {
                setPrescriptions(res.data)
                console.log("prescriptions",res.data)
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
