import mongoose from 'mongoose'

const prescriptionSchema= new mongoose.Schema({
    name:{
        type:String,
        required:  [
            true,
            'Please enter the name of the prescription.',
        ],
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


TimesperWeek:{
    type: Number,
    min: [1, 'enter a positive number at min 1'],
        required: true,
},

TimesperDay:{
    type: Number,
    min: [1, 'enter a positive number at min 1'],
        required: true,

},

},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}

)

