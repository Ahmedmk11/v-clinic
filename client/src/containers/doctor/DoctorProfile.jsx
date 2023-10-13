import './css/doctorProfile.css'
import doctorImg from '../../assets/imgs/doctorProfile.png'
import { useState, useContext,useEffect } from 'react'
import axios from 'axios'
import CurrUserContext from '../../contexts/CurrUser'
import { use } from 'react'
const DoctorProfile = () => {
    const { currUser: Doctor, setCurrUser: setDoctor } =
        useContext(CurrUserContext)
    const [DoctorInfo, setDoctorInfo] = useState({})
    const [EditMessage, setEditMessage] = useState('')
    const [EditMode, setEditMode] = useState(false)
    const [SaveButtonClicked, setSaveButtonClicked] = useState(false)

    const handleInputChange = (e, changedField) => {
        setDoctorInfo({ ...DoctorInfo, [changedField]: e.target.value })
    }

    useEffect(() => {
        setDoctorInfo(Doctor)
    }, [Doctor])

    const getDoctorData = (key, fieldType, representativeKey) => {
        return (
          Doctor &&  <li>
                <strong>{representativeKey}: </strong>
                {EditMode && key !== 'education' ? (
                    <input
                        type={fieldType}
                        value={DoctorInfo[key]}
                        onChange={(e) => {
                            handleInputChange(e, key)
                        }}
                    />
                ) : key === 'email' ? (
                    <a>{Doctor[key]}</a>
                ) : (
                    Doctor[key]
                )}
            </li>
        )
    }

    const getButtons = () => {
        return EditMode ? (
            <div className='edit-buttons'>
                <button
                    className='button cancel-button'
                    onClick={() => {
                        setEditMode(false)
                        setDoctorInfo(Doctor)
                        setEditMessage('canceled')
                        setTimeout(() => setEditMessage(''), 5000)
                    }}>
                    Cancel
                </button>
                <button
                    className='button'
                    disabled={SaveButtonClicked}
                    onClick={handleSave}>
                    Save
                </button>
            </div>
        ) : (
            <button
                className='button'
                onClick={() => {
                    setEditMode(true)
                    setEditMessage('')
                }}>
                Edit Profile
            </button>
        )
    }

    const handleSave = async () => {
        setSaveButtonClicked(true)
        try {
            await axios.put(
                `http://localhost:3000/api/doctor/update-doctor`,
                DoctorInfo
            )
            setDoctor(DoctorInfo)
            setEditMode(false)
            setEditMessage('success')
            setSaveButtonClicked(false)
        } catch (err) {
            setEditMessage('failed')
        } finally {
            setTimeout(() => {
                setEditMessage('')
                setSaveButtonClicked(false)
            }, 5000)
        }
    }

    const getDoctorInfo = () => {
        return (
            <>
                <div className={`message ${EditMessage}`}>
                    {EditMessage === 'success'
                        ? 'Saved successfully!'
                        : EditMessage === 'failed'
                        ? 'Could not save. Please try again later.'
                        : 'Did not save any changes.'}
                </div>
                <ul>
                    {getDoctorData('education', 'text', 'Education')}
                    {getDoctorData('email', 'email', 'Email')}
                    {getDoctorData('hourly_rate', 'number', 'HourlyRate')}
                    {getDoctorData('affiliation', 'text', 'Affiliation')}
                    {getDoctorData('speciality', 'text', 'Speciality')}
                </ul>
                {getButtons()}
            </>
        )
    }

    return (
        <div className='page'>
            <div className='primary-container'>
                <div className='doctor-name-img'>
                    <img src={doctorImg} alt='Profile Image' />
                    <section>
                        <h2>Dr. {Doctor?.name}</h2>
                        <p>
                            <strong>Status: </strong>
                            <span className={Doctor?.status}>
                                {' '}
                                {Doctor?.status}{' '}
                            </span>
                        </p>
                    </section>
                </div>
                <div className='doctor-info-container'>{getDoctorInfo()}</div>
            </div>
        </div>
    )
}

export default DoctorProfile
