import { formatDateRange } from '../../../utils/convertDateToString.js'

const AppointmentCard = ({ Appointment }) => {
    return (
        <div className='card'>
            <h3>Patient: {Appointment.patient_id.name}</h3>
            <p>
                <strong>Status: </strong>
                <span className={'status ' + Appointment.status}>
                    {Appointment.status}
                </span>
            </p>
            <p>
                <strong>
                    {formatDateRange(
                        Appointment.start_time,
                        Appointment.end_time
                    )}
                </strong>
            </p>
        </div>
    )
}

export default AppointmentCard
