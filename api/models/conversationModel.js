import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ConversationSchema = new Schema(
    {
        members: {
            type: Array,
        },
        membersInfo: {
            type: Array,
        },
    },
    { timestamps: true }
)

const ConversationModel = mongoose.model('Chat', ConversationSchema)

export default ConversationModel