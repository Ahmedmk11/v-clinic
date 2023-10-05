import './viewPatients.css'
import PatientList from '../../components/PatientList/PatientList'
import { useEffect,useState } from 'react'

const ViewPatients = () => {
    const [Patients, setPatients] = useState([])
    const [SelectedPatient, setSelectedPatient] = useState({})
    useEffect(() => {
        fetchPatients()
    }, [])
    const fetchPatients = () => {
        // axios
        //     .get('http://localhost:10000/api/patients')
        //     .then((response) => setPatients(response.data))
        //     .catch((error) => console.error('Error fetching patients:', error))
        const patientsTemp = [
            {
                id: 1,
                name: 'John Doe',
                age: 35,
                contact: '123-456-7890',
                lastVisit: '2023-09-01',
                nextAppointment: '2022-10-15',
            },
            {
                id: 2,
                name: 'Jane Smith',
                age: 42,
                contact: '987-654-3210',
                lastVisit: '2023-08-20',
                nextAppointment: '2022-11-05',
            },
            {
                id: 3,
                name: 'Michael Johnson',
                age: 28,
                contact: '555-123-4567',
                lastVisit: '2023-07-10',
                nextAppointment: '2022-10-28',
            },
            {
                id: 4,
                name: 'Emily Davis',
                age: 50,
                contact: '111-222-3333',
                lastVisit: '2023-08-15',
                nextAppointment: '2022-12-03',
            },
            {
                id: 5,
                name: 'William Brown',
                age: 65,
                contact: '444-555-6666',
                lastVisit: '2023-06-25',
                nextAppointment: '2022-11-18',
            },
            {
                id: 6,
                name: 'Sarah Johnson',
                age: 38,
                contact: '777-888-9999',
                lastVisit: '2023-09-05',
                nextAppointment: '2022-10-30',
            },
            {
                id: 7,
                name: 'Christopher Lee',
                age: 45,
                contact: '222-333-4444',
                lastVisit: '2023-07-18',
                nextAppointment: '2022-11-10',
            },
            {
                id: 8,
                name: 'Amanda Wilson',
                age: 29,
                contact: '666-777-8888',
                lastVisit: '2023-08-12',
                nextAppointment: '2022-12-15',
            },
            {
                id: 9,
                name: 'Daniel Thomas',
                age: 55,
                contact: '999-000-1111',
                lastVisit: '2023-09-10',
                nextAppointment: '2022-11-25',
            },
            {
                id: 10,
                name: 'Olivia White',
                age: 31,
                contact: '333-444-5555',
                lastVisit: '2023-07-28',
                nextAppointment: '2022-12-08',
            },
            {
                id: 11,
                name: 'Joseph Anderson',
                age: 48,
                contact: '888-999-0000',
                lastVisit: '2023-08-05',
                nextAppointment: '2023-11-20',
            },
            {
                id: 12,
                name: 'Sophia Martinez',
                age: 36,
                contact: '444-333-2222',
                lastVisit: '2023-09-15',
                nextAppointment: '2023-11-12',
            },
        ]
        setPatients(patientsTemp)
    }
    return (
        <div className='viewPatients-page'>
            <PatientList patients={Patients} />
        </div>
    )
}
export default ViewPatients
