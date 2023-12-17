import Cart from '../models/cartModel.js'
import Prescription from '../models/prescriptionsModel.js'

const fillCartWithPrescription = async (req, res) => {
    try {
        let cart = await Cart.findOne({ patient_id: req.body.id })
        if (!cart) {
            cart = new Cart({ patient_id: req.body.id, items: [] })
        }
        const prescription = await Prescription.findById(
            req.params.prescription_id
        )
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' })
        }
        if (prescription.status === 'filled') {
            return res
                .status(400)
                .json({ message: 'Prescription already filled' })
        }
        prescription.status = 'filled'
        await prescription.save()

        prescription.medications.forEach((medication) => {
            const existingItem = cart.items.find(
                (item) =>
                    item.medicine_id.toString() ===
                    medication.medicine_id.toString()
            )
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                cart.items.push({
                    medicine_id: medication.medicine_id,
                    quantity: 1,
                })
            }
        })
        await cart.save()
        res.status(200).json({ message: 'Cart filled with prescription' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { fillCartWithPrescription }
