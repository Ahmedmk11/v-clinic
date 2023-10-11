import React, { useState } from 'react';

function PatientRegistration() {

    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        birthdate: '',
        gender: '',
        phoneNumber: '',
        emergencyName: '',
        emergencyPhoneNumber: '',
        package: '',
        health_records: '',
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/patient/create-patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if(response.ok) {
                setMessage('Registration Successful');
                setFormData({
                    username: '',
                    name: '',
                    email: '',
                    password: '',
                    birthdate: '',
                    gender: '',
                    phoneNumber: '',
                    emergencyName: '',
                    emergencyPhoneNumber: '',
                    package: '',
                    health_records: '',
                });
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Date of Birth:
                    <input
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Gender:
                    <select name="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </label>
                <br />
                <label>
                    Phone Number:
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Emergency Contact Name:
                    <input
                        type="text"
                        name="emergencyName"
                        value={formData.emergencyName}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Emergency Contact Phone Number:
                    <input
                        type="text"
                        name="emergencyPhoneNumber"
                        value={formData.emergencyPhoneNumber}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Register</button>
                {message && <p>{message}</p>}
            </form>

            <a href="/register/doctor">Want to register as a Doctor ?</a>
        </>
    );
}

export default PatientRegistration;
