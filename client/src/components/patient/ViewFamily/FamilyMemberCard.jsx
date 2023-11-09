import { useEffect, useState } from 'react'
import './familyMemberCard.css'

import axios from 'axios'

const FamilyMemberCard = ({ member, mode }) => {
    const [currMember, setCurrMember] = useState({})
    const [relation, setRelation] = useState('')
    const [packageName, setPackageName] = useState(null)

    useEffect(() => {
        if (mode == '2') {
            const fetchCurrMember = async () => {
                try {
                    const res = await axios.get(
                        `http://localhost:3000/api/patient/get-patient-by-id/${member.id}`,
                        {
                            withCredentials: true,
                        }
                    )
                    setCurrMember(res.data)
                    setRelation(member.relation)
                    if (res.data.package) {
                        const res2 = await axios.get(
                            `http://localhost:3000/api/admin/getPackage/${res.data.package}`,
                            {
                                withCredentials: true,
                            }
                        )
                        setPackageName(res2.data.name)
                    }
                } catch (error) {
                    console.error(error)
                }
            }
            fetchCurrMember()
        }
    }, [])

    return (
        <div className='card'>
            <div>
                {mode === '1' ? (
                    <>
                        <div>
                            <strong>Name: </strong> {member.name}
                        </div>
                        <div>
                            <strong>National ID: </strong> {member.national_id}
                        </div>
                        <div>
                            <strong>Age: </strong> {member.age}
                        </div>
                        <div>
                            <strong>Gender: </strong> {member.gender}
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <strong>Name: </strong> {currMember.name}
                        </div>
                        <div>
                            <strong>Email: </strong> {currMember.email}
                        </div>
                        <div>
                            <strong>Phone Number: </strong>{' '}
                            {currMember.phoneNumber}
                        </div>
                        <div>
                            <strong>Package: </strong>{' '}
                            {packageName ?? 'Not subscribed to a package'}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default FamilyMemberCard
