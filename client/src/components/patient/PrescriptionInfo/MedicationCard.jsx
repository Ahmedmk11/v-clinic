import { useEffect, useState } from 'react'
import axiosApi from '../../../utils/axiosApi'

const MedicationCard = ({ medication }) => {
    console.log(medication)
    const [name, setName] = useState('')

    useEffect(() => {
        axiosApi
            .get('/doctor/get-all-medicines')
            .then((res) => {
                res.data.forEach((medicine) => {
                    if (medicine._id === medication.medicine_id) {
                        setName(medicine.name)
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className='history-card'>
            <h3>{name}</h3>
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
    )
}

export default MedicationCard
