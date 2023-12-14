import PatientList from '../../components/doctor/ViewPatients/PatientList'
import { useEffect, useState, useContext } from 'react'
import CurrUserContext from '../../contexts/CurrUser'
import axiosApi from '../../utils/axiosApi'

const ViewPatients = () => {
    const { currUser: Doctor } = useContext(CurrUserContext)
    const [Patients, setPatients] = useState([])
    const [skeleton, setSkeleton] = useState(true)
    useEffect(() => {
        {
            Doctor && fetchPatients()
        }
    }, [Doctor])
    const fetchPatients = () => {
        axiosApi
            .get(
                `/patient/get-patients-by-doctor-id/${Doctor._id}`
            )
            .then((res) => setPatients(res.data))
            .catch((err) => console.log(err)).finally(() => setSkeleton(false))
    }
    return (
        <div className='page'>
       <PatientList patients={Patients}  skeleton={skeleton}/>
        </div>
    )
}
export default ViewPatients
