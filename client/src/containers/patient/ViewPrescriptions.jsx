import { useEffect, useState } from 'react'
import axios from 'axios'
import ViewPrescriptionsList from '../../components/patient/ViewPrescriptions/ViewPrescriptionsList'
const PatientViewPrescription = () => {
    const [currUser, setCurrUser] = useState({
        _id: '652185ccf27b074cbbae82b6', // TBA in next sprints
    })
    const [prescriptions, setPrescriptions] = useState([])
    useEffect(() => {
        axios
            .get('http://localhost:3000/api/patient/get-patient-prescription/'+currUser._id)
            .then((res) => {
                setPrescriptions(res.data)
                console.log("prescriptions",res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className='page'>
            <ViewPrescriptionsList prescriptions={prescriptions} />
        </div>
    )
}

export default PatientViewPrescription
