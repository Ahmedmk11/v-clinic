import React from 'react'
import logoIcn from '../../../assets/icons/logo.svg'
import './landingPage.css'
import Theme from '../../../components/layout/Header/Theme'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const LogoIcon = () => <img id='logo' style={{ width: 350 }} src={logoIcn} />

const LandingPage = () => {
    const navigate = useNavigate()
    return (
        <div id='landing-page'>
            <Button
                id='login-button-landing'
                type='primary'
                onClick={() => {
                    navigate('/login')
                }}>
                Login
            </Button>
            <Theme />
            <div id='left'>
                <LogoIcon />
            </div>
            <div id='right'>
                <h1>Welcome to V-Clinic</h1>
                <p>
                    V-Clinic is a web application that allows patients to
                    connect with doctors and book appointments. It also allows
                    doctors to manage their patients and appointments.
                </p>
                <p>
                    With V-Clinic, you can easily search for doctors based on
                    their specialties, view their profiles, and book
                    appointments at your convenience. Our platform provides a
                    seamless experience for both patients and doctors, ensuring
                    efficient communication and scheduling.
                </p>
                <p>
                    Whether you're a patient in need of medical care or a doctor
                    looking to streamline your practice, V-Clinic is here to
                    help. Register today and experience the future of
                    healthcare.
                </p>

                <div id='buttons'>
                    <Button
                        size='large'
                        type='primary'
                        onClick={() => {
                            navigate('/register')
                        }}>
                        Register
                    </Button>
                    <Button
                        size='large'
                        type='primary'
                        onClick={() => {
                            navigate('/register-doctor')
                        }}>
                        Register as Doctor
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
