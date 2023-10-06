import './viewPatients.css'
import PatientList from '../../components/PatientList/PatientList'
import { useEffect,useState } from 'react'
import axios from 'axios'

const ViewPatients = ({doctorId}) => {
    const [Patients, setPatients] = useState([])
    useEffect(() => {
        fetchPatients()
    }, [])
    const fetchPatients = () => {
        axios
        .get(
            `http://localhost:3000/api/patient/get-patients-by-doctor-id/${doctorId}`
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
