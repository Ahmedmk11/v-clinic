import { useState, useEffect } from 'react'
import { DatePicker, Select ,Skeleton} from 'antd'
import Pagination from '../../reusable/Pagination/Pagination'
import PrescriptionCard from './PrescriptionCard'

const ViewPrescriptionsList = ({ prescriptions,loading }) => {
    const [displayedPrescriptions, setDisplayedPrescriptions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedStates, setSelectedStates] = useState([])
    const [Doctors, setDoctors] = useState([])
    const [selectedDoctors, setSelectedDoctors] = useState([])
    const [dateRange, setDateRange] = useState(null)
    const PrescriptionsPerPage = 8

    const applyFilters = () => {
        let filtered = prescriptions
        if (selectedStates.length > 0) {
            filtered = filtered.filter((appointment) =>
                selectedStates.includes(appointment.status)
            )
        }
        if (selectedDoctors.length > 0) {
            filtered = filtered.filter((appointment) =>
                selectedDoctors.includes(appointment.doctorName)
            )
        }
        if (dateRange) {
            filtered = filtered.filter(
                (appointment) =>
                    new Date(appointment.date).toDateString() ===
                    new Date(dateRange).toDateString()
            )
        }
        setDisplayedPrescriptions(filtered)
        setCurrentPage(1)
    }

    const getCurrentPrescriptions = () => {
        const indexOfLastPrescription = currentPage * PrescriptionsPerPage
        const indexOfFirstPrescription =
            indexOfLastPrescription - PrescriptionsPerPage
        const currentPrescriptions = displayedPrescriptions.slice(
            indexOfFirstPrescription,
            indexOfLastPrescription
        )
        if (loading)
        return<div className='card'>
            <Skeleton active />
        </div>
            return currentPrescriptions.length > 0
                ? currentPrescriptions.map((prescription) => (
                      <PrescriptionCard
                          key={prescription._id}
                          prescription={prescription}
                      />
                  ))
                : 'No prescriptions to show'
    }

    useEffect(() => {
        let options = []
        if (displayedPrescriptions?.length > 0) {
            displayedPrescriptions.forEach((prescription) => {
                if (
                    !options.some(
                        (obj) => obj.value === prescription.doctorName
                    )
                ) {
                    options.push({
                        label: prescription.doctorName,
                        value: prescription.doctorName,
                    })
                }
            })
        }
        setDoctors(options)
    }, [displayedPrescriptions])

    useEffect(() => {
        applyFilters()
    }, [selectedStates, dateRange, selectedDoctors, prescriptions])

    const handleChange = (value) => {
        setSelectedStates(value)
    }

    const handleDoctorChange = (value) => {
        setSelectedDoctors(value)
    }
    const handleDateChange = (dates) => {
        setDateRange(dates)
    }
    return (
        <div className='primary-container'>
            <h2>My Prescriptions</h2>
            <label style={{ margin: 0 }}>Pick a date to filter on: </label>
            <br></br>
            <DatePicker
                className='DatePicker'
                format='YYYY-MM-DD'
                onChange={handleDateChange}
            />
            <br></br>
            <label style={{ margin: 0 }}>Pick a status to filter on: </label>
            <br></br>
            <Select
                className='Select'
                allowClear
                placeholder='Select state'
                onChange={handleChange}
                options={[
                    {
                        label: 'Filled',
                        value: 'filled',
                    },
                    { label: 'Unfilled', value: 'unfilled' },
                ]}
            />
            <br></br>
            <label style={{ margin: 0 }}>Pick a doctor to filter on: </label>
            <br></br>
            <Select
                className='Select'
                mode='multiple'
                allowClear
                placeholder='Select Doctors'
                onChange={handleDoctorChange}
                options={Doctors}
            />
            <div className='card-list'>{getCurrentPrescriptions()}</div>
            <Pagination
                itemsPerPage={PrescriptionsPerPage}
                totalItems={displayedPrescriptions.length}
                paginate={(pageNumber) => setCurrentPage(pageNumber)}
                currentPage={currentPage}
            />
        </div>
    )
}

export default ViewPrescriptionsList
