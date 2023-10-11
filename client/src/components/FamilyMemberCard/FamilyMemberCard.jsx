import './familyMemberCard.css'

const FamilyMemberCard = ({ member }) => {
    return (
        <div className='member-card'>
            <div>
                <div>
                    <strong>Name: </strong> {member.name}
                </div>
                <div>
                    <strong>Relation: </strong> {member.relation}
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
