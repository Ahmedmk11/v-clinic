import './viewPatients.css'
import PatientList from '../../components/doctor/ViewPatients/PatientList'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import DoctorContext from '../../context/Doctor'
const ViewPatients = () => {
    const { Doctor } = useContext(DoctorContext)
    const [Patients, setPatients] = useState([])
    useEffect(() => {
        {
            Doctor._id && fetchPatients()
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
        <div className='viewPatients-page'>
            <PatientList patients={Patients} />
        </div>
    )
}
export default ViewPatients
