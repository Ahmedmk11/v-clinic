import { useEffect, useState } from 'react'
import axios from 'axios'

import './familyMembers.css'

import FamilyMemberCard from '../FamilyMemberCard/FamilyMemberCard'

const FamilyMembers = ({ id }) => {
    const [familyMembers, setFamilyMembers] = useState([])

    useEffect(() => {
        axios
            .get(
                `http://localhost:3000/api/patient/get-patient-family-members/${id}`
            )
            .then((res) => {
                setFamilyMembers(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div id='family-members-container'>
            <h2>Family Members</h2>
            <div id='family-members-content'>
                {familyMembers.map((member) => (
                    <FamilyMemberCard member={member} />
                ))}
            </div>
        </div>
    )
}

export default FamilyMembers
