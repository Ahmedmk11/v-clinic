import './familyMemberCard.css'

const FamilyMemberCard = ({ member }) => {
    return (
        <div className='card'>
            <div>
                <h3>{member.relation}</h3>
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
            </div>
        </div>
    )
}

export default FamilyMemberCard
