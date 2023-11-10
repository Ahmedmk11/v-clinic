import axios from "axios"
import axiosApi, { baseURLclient } from "../../utils/axiosApi"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
 const PatientPackageSuccess = () => {
    const { patientID, packageID } = useParams()
    useEffect (() => {
        axiosApi.post(`/patient/add-package/${patientID}`, {
                packageID
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => console.log(err))
    }, []) 


    return (
        <div className="sub-container">
            <h3>Payment Successful</h3>
            <a href={`${baseURLclient}patient/profile`}>Redirect to profile</a>
        </div>
    )
}

export default PatientPackageSuccess

