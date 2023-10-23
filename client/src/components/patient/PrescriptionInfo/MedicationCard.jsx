const MedicationCard = ({ medication}) => {
    return <div className='history-card' >
        <h3>{medication.name}</h3>
        <p>
            <strong>Dosage: </strong>
            {medication.dosage}
        </p>
        <p>
            <strong>Frequency: </strong>
            {medication.frequency}
        </p>
        <p>
            <strong>Duration: </strong>
            {medication.duration}
        </p>
    </div>
}

export default MedicationCard;