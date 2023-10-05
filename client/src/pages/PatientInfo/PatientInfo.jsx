import { useEffect, useState } from 'react'
import './patientInfo.css'
import { useParams } from 'react-router-dom'

const PatientInfoComponent = () => {
    const { id } = useParams()
    const [editedPatient, setEditedPatient] = useState({})
    const [isEditMode, setIsEditMode] = useState(false)
    const [saveMessage, setSaveMessage] = useState(null)

    useEffect(() => {
        fetchPatientById(id)
    }, [id])

    const fetchPatientById = (id) => {
        // axios
        //     .get(`http://localhost:10000/api/patients/${id}`)
        //     .then((response) => setEditedPatient(response.data))
        //     .catch((error) =>
        //         console.error('Error fetching patient by id:', error)
        //     )
    }

    const editPatientById = (id, patient) => {
        console.log('will edit', id, patient.name, ' on db')
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditedPatient((prevPatient) => ({
            ...prevPatient,
            [name]: value,
        }))
    }

    const handleSaveClick = () => {
        editPatientById(editedPatient.id, editedPatient)
        setIsEditMode(false)
        setSaveMessage('Changes saved successfully.') // Set success message after saving changes
        // You can also handle error cases and set appropriate error messages here if needed
    }

    return (
        <div className='patient-info-container'>
            <h2>Selected Patient</h2>
            <div className='patient-info'>
                <h2>
                    {editedPatient.name}
                    {"'s Information"}
                    {isEditMode ? ' (Edit Mode)' : ''}
                </h2>
                {saveMessage && (
                    <div
                        className={`save-message ${
                            saveMessage.includes('success')
                                ? 'success'
                                : 'error'
                        }`}>
                        {saveMessage}
                    </div>
                )}
                <div>
                    <strong>ID:</strong> {editedPatient.id}
                </div>
                <div>
                    <strong>Age:</strong>{' '}
                    {isEditMode ? (
                        <input
                            type='text'
                            name='age'
                            value={editedPatient.age}
                            onChange={handleInputChange}
                        />
                    ) : (
                        editedPatient.age
                    )}
                </div>
                <div>
                    <strong>Contact:</strong>{' '}
                    {isEditMode ? (
                        <input
                            type='text'
                            name='contact'
                            value={editedPatient.contact}
                            onChange={handleInputChange}
                        />
                    ) : (
                        editedPatient.contact
                    )}
                </div>
                <div>
                    <strong>Last Visit:</strong>{' '}
                    {isEditMode ? (
                        <input
                            type='date'
                            name='lastVisit'
                            value={editedPatient.lastVisit}
                            onChange={handleInputChange}
                        />
                    ) : (
                        editedPatient.lastVisit
                    )}
                </div>
                <div>
                    <strong>Next Appointment:</strong>{' '}
                    {isEditMode ? (
                        <input
                            type='date'
                            name='nextAppointment'
                            value={editedPatient.nextAppointment}
                            onChange={handleInputChange}
                        />
                    ) : (
                        editedPatient.nextAppointment
                    )}
                </div>
                {isEditMode ? (
                    <button
                        className='save-button button'
                        onClick={handleSaveClick}>
                        Save
                    </button>
                ) : (
                    <button
                        className='edit-button button'
                        onClick={() => setIsEditMode(true)}>
                        Edit
                    </button>
                )}
            </div>
        </div>
    )
}

export default PatientInfoComponent
