import { useEffect, useState } from 'react'
import calcAge from '../../../utils/calcAge'
import axiosApi from '../../../utils/axiosApi'
const PatientInfoCard = ({ SelectedPatient, id }) => {
    const [nextAppointment, setNextAppointment] = useState(null)
    const [lastVisit, setLastVisit] = useState(null)
    useEffect(() => {
        if (!SelectedPatient) return
        axiosApi
            .get(`/patient/get-patients-by-doctor-id/${id}`)
            .then((res) => {
                let patient = res.data?.find(
                    (patient) => patient?._id === SelectedPatient?._id
                )
                setNextAppointment(patient.nextAppointment)
                setLastVisit(patient.lastVisit)
            })
            .catch((err) => console.log(err))
    }, [SelectedPatient])

    const GetPatientInfo = () => {
        return (
            <>
                <ul>
                    <li>
                        <strong>Age: </strong>{' '}
                        {calcAge(SelectedPatient?.birthdate)}
                    </li>
                    <li>
                        <strong>Gender: </strong> {SelectedPatient?.gender}
                    </li>
                    <li>
                        <strong>Phone Number: </strong>
                        <a href={`tel:${SelectedPatient?.phoneNumber}`}>
                            {SelectedPatient?.phoneNumber}
                        </a>
                    </li>
                    <li>
                        <strong>Email: </strong>{' '}
                        <a href={`mailto:${SelectedPatient?.email}`}>
                            {SelectedPatient?.email}
                        </a>
                    </li>
                    <li>
                        <strong>Last Visit: </strong>{' '}
                        {lastVisit
                            ? new Date(lastVisit).toLocaleString()
                            : 'No previous visits'}
                    </li>
                    <li>
                        <strong>Next Appointment: </strong>{' '}
                        {nextAppointment
                            ? new Date(nextAppointment).toLocaleString()
                            : 'No upcoming appointments'}
                    </li>
                    <li>
                        <strong>Emergency Contact: </strong>{' '}
                        {`${SelectedPatient?.emergencyName},`}{' '}
                        <a
                            href={`tel:${SelectedPatient?.emergencyPhoneNumber}`}>
                            {SelectedPatient?.emergencyPhoneNumber}
                        </a>
                    </li>
                </ul>
            </>
        )
    }
    return (
        <div className='sub-container patient-info'>
            <h2>General Info</h2>
            <GetPatientInfo />
        </div>
    )
}

export default PatientInfoCard
