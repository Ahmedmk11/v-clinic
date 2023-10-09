import { formatDateRange } from '../../utils/convertDateToString.js'

const AppointmentCard = ({ Appointment }) => {
    return (
        <div className='patient-card'>
            <h3>Patient: {Appointment.patient_id.name}</h3>
            <p>
                <strong className={'status' + Appointment.status}>
                    Status:{' '}
                </strong>
                {Appointment.status}
            </p>
            <p>
                <strong>Time </strong>
                {formatDateRange(Appointment.start_time, Appointment.end_time)}
            </p>
        </div>
    )
}

export default AppointmentCard
