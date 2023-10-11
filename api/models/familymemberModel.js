import mongoose from 'mongoose'

const familyMemberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter the name of the prescription.'],
            validate: [
                {
                    validator: function (value) {
                        return /^[A-Za-z\s]+$/.test(value)
                    },
                    message: 'Name must contain only letters and spaces.',
                },
            ],
            minlength: [
                3,
                'Please enter a username that is 3 characters or longer',
            ],
        },

        patient_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Patient',
        },
        national_id: {
            type: Number,
            required: [true, 'Please enter your National ID'],
            validate: [
                {
                    validator: function (value) {
                        return /^\d+$/.test(value)
                    },
                    message: 'National ID must contain only numbers.',
                },
            ],
        },
        gender: {
            type: String,
            required: [true, 'Please select your gender.'],
            enum: ['Male', 'Female'],
        },
        age: {
            type: Number,
            required: [true, 'Please select your age.'],
            min: [1, 'enter a positive number at min 1'],
        },
        relation: {
            type: String,
            required: [true, 'Please select your a relation.'],
            enum: ['Wife', 'Husband', 'Child'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

const FamilyMemberModel = mongoose.model('FamilyMember', familyMemberSchema)

export default FamilyMemberModel
