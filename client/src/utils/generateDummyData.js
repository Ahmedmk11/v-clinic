import { faker } from '@faker-js/faker'
import axiosApi from './axiosApi'

export const generateDummyData = async (count = 1, mode = 'doctor') => {
    const generatePatientData = () => {
        const username = faker.internet
            .userName(4, 20)
            .toLowerCase()
            .replace(/[^a-z0-9]/gi, '')
        const name = `${faker.person.firstName()} ${faker.person.lastName()}`
        const email = faker.internet.email()
        const password = '12345678Aa'
        const birthdate = faker.date.between({
            from: '1950-01-01',
            to: '2005-01-01',
        })
        const gender = Math.random() < 0.5 ? 'male' : 'female'
        const phoneNumber = faker.phone.number()
        const emergencyName = `${faker.person.firstName()} ${faker.person.lastName()}`
        const emergencyPhoneNumber = faker.phone.number()

        return {
            username,
            name,
            email,
            password,
            birthdate,
            gender,
            phoneNumber,
            emergencyName,
            emergencyPhoneNumber,
        }
    }
    const generateDoctorData = () => {
        const username = faker.internet
            .userName(4, 20)
            .toLowerCase()
            .replace(/[^a-z0-9]/gi, '')
        const name = `${faker.person.firstName()} ${faker.person.lastName()}`
        const email = faker.internet.email().toLowerCase()
        const password = '12345678Aa'
        const dob = faker.date.between({ from: '1950-01-01', to: '2005-01-01' })
        const hourly_rate = Math.ceil(Math.random() * 195) * 10 + 50
        const affiliation = 'Independant'
        const education = faker.person.jobArea()
        const randomValue = Math.random()
        const status =
            randomValue < 0.33
                ? 'Active'
                : randomValue < 0.66 && randomValue >= 0.33
                ? 'Pending'
                : 'Rejected'

        const speciality = faker.person.jobType()

        return {
            username,
            name,
            email,
            password,
            dob,
            hourly_rate,
            affiliation,
            education,
            status,
            speciality,
        }
    }

    const createPatient = async (data) => {
        try {
            const response = await axiosApi.post(
                '/patient/create-patient',
                data
            )
        } catch (error) {
            console.error('Error creating patient:', error)
        }
    }
    const createDoctor = async (data) => {
        try {
            const response = await axiosApi.post(
                '/doctor/create-doctor',
                data
            )
        } catch (error) {
            console.error('Error creating doctor:', error)
        }
    }

    try {
        if (mode === 'doctor') {
            for (let i = 0; i < count; i++) {
                const doctorData = generateDoctorData()
                await createDoctor(doctorData)
            }
        } else if (mode === 'patient') {
            for (let i = 0; i < count; i++) {
                const patientData = generatePatientData()
                await createPatient(patientData)
            }
        }
    } catch (error) {
        console.error(error)
    }
}
