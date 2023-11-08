import mongoose from 'mongoose'

const familyModel = new mongoose.Schema(
    {
        member: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Patient',
                },
                relation: {
                    type: String,
                    required: [true, 'Please enter the relationship.'],
                },
            },
        ],
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

familyModel.virtual('patients', {
    ref: 'Patient',
    localField: 'member',
    foreignField: '_id',
})

const FamilyModel = mongoose.model('Family', familyModel)

export default FamilyModel
