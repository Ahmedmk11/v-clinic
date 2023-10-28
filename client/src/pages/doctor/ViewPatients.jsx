import PatientList from '../../components/doctor/ViewPatients/PatientList'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import CurrUserContext from '../../contexts/CurrUser'
const ViewPatients = () => {
    const { currUser: Doctor } = useContext(CurrUserContext)
    const [Patients, setPatients] = useState([])
    useEffect(() => {
        {
            Doctor && fetchPatients()
        }
    }, [Doctor])
    const fetchPatients = () => {
        axios
            .get(
                `http://localhost:3000/api/patient/get-patients-by-doctor-id/${Doctor._id}`
            )
            .then((res) => setPatients(res.data))
            .catch((err) => console.log(err))
    }
    return (
        <div className='page'>
            <PatientList patients={Patients} />
        </div>
    )
}
export default ViewPatients
