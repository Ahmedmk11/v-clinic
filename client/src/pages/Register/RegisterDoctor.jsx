import React, { useState } from 'react';

function DoctorRegistration() {

    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        dob: '',
        hourly_rate: '',
        affiliation: '',
        education: '',
        status: '',
        speciality: '',
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
            const response = await fetch('http://localhost:3000/api/doctor/create-doctor', {
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
                    dob: '',
                    hourly_rate: '',
                    affiliation: '',
                    education: '',
                    status: '',
                    speciality: '',
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
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Hourly Rate:
                    <input
                        type="text"
                        name="hourly_rate"
                        value={formData.hourly_rate}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Affiliation:
                    <input
                        type="text"
                        name="affiliation"
                        value={formData.affiliation}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Educational Background:
                    <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Speciality:
                    <input
                        type="text"
                        name="speciality"
                        value={formData.speciality}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Register</button>
                {message && <p>{message}</p>}
            </form>
        </>
    );
}

export default DoctorRegistration;
