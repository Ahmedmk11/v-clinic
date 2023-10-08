import axios from "axios"
import { useState } from "react"

const AddPackageForm = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [sessionDiscount, setSessionDiscount] = useState('')
    const [medicineDiscount, setMedicineDiscount] = useState('')
    const [familySubsDiscount, setFamilySubsDiscount] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3000/api/admin/addPackage", { 
                name,
                price,
                sessionDiscount,
                medicineDiscount,
                familySubsDiscount
            })
            setSuccess("Package added succesfully")
            setError(null)
            setName('')
            setPrice('')
            setFamilySubsDiscount('')
            setSessionDiscount('')
            setMedicineDiscount('')
        } catch (error) {
            if (error.response.data.message){
                setError(error.response.data.message)
            }
            else{
                setError(`Package with name ${error.response.data.keyValue.name} already exists`)
            }
            setSuccess(null)
        }
    }

    return (

        <div className="admin-page">
       <div className="admin-form-container">
            <h2>Add a new Package</h2>
       <form className="adminForm" onSubmit={handleSubmit}>

            <label><strong>Name:</strong></label>
            <input 
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            />

            <label><strong>Price:</strong></label>
            <input 
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            />

            <label><strong>Session Discount:</strong></label>
            <input 
            type="number"
            onChange={(e) => setSessionDiscount(e.target.value)}
            value={sessionDiscount}
            />

            <label><strong>Medicine Discount:</strong></label>
            <input 
            type="number"
            onChange={(e) => setMedicineDiscount(e.target.value)}
            value={medicineDiscount}
            />

            <label><strong>Family Subscription Discount:</strong></label>
            <input 
            type="number"
            onChange={(e) => setFamilySubsDiscount(e.target.value)}
            value={familySubsDiscount}
            />


            <button className="button" type="submit">Submit</button>
            {error ? <div className="errorAdminForm">{error}</div> : null}
            {success ? <div className="successAdminForm">{success}</div> : null}
        </form>
            </div>
       </div>
    )
}

export default AddPackageForm