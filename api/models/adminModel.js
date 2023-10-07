import mongoose from 'mongoose'
const Schema = mongoose.Schema

const adminSchema = new Schema(
    {
        Username: {
            type: String,
            required: true,
        },
        Password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

const adminModel = mongoose.model('Admin', adminSchema)
export default adminModel
