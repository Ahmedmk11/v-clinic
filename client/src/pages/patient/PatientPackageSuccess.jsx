import axios from "axios"
import { baseURLclient } from "../../utils/axiosApi"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
 const PatientPackageSuccess = () => {
    const { patientID, packageID } = useParams()
    useEffect (async () => {
        try {
            const res = await axios.post(`/patient/add-package/${patientID}`, {
                packageID
            })
        } catch (error) {
            console.log(error)
        }
    }, []) 


    return (
        <div className="sub-container">
            <h3>Payment Successful</h3>
            <a href={`${baseURLclient}patient/profile`}>Redirect to profile</a>
        </div>
    )
}

export default PatientPackageSuccess

