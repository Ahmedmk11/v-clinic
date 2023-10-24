import calcAge from '../../../utils/calcAge'
const PatientInfoCard = ({ SelectedPatient }) => {
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
                        {SelectedPatient?.lastVisit
                            ? new Date(
                                  SelectedPatient?.lastVisit
                              ).toLocaleString()
                            : 'No previous visits'}
                    </li>
                    <li>
                        <strong>Next Appointment: </strong>{' '}
                        {SelectedPatient?.nextAppointment
                            ? new Date(
                                  SelectedPatient?.nextAppointment
                              ).toLocaleString()
                            : 'No upcoming appointments'}
                    </li>
                    <li>
                        <strong>Emergency Contact: </strong>{' '}
                        {`${SelectedPatient?.emergencyName},`}{' '}
                        <a href={`tel:${SelectedPatient?.emergencyPhoneNumber}`}>
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
