import { baseURLclient } from "../../utils/axiosApi"
 const PatientPackageSuccess = () => {
    return (
        <div className="sub-container">
            <h3>Payment Successful</h3>
            <a href={`${baseURLclient}patient/profile`}>Redirect to profile</a>
        </div>
    )
}

export default PatientPackageSuccess

