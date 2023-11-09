import FamilyMembers from '../../components/patient/ViewFamily/FamilyMembers'

import CurrUserContext from '../../contexts/CurrUser'
import { useContext } from 'react'

const AddFamily = () => {
    const { currUser } = useContext(CurrUserContext)
    return <FamilyMembers id={currUser?._id} />
}

export default AddFamily
