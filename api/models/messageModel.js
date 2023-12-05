import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MessageSchema = new Schema(
    {
        conversationId: {
            type: String,
            ref: 'Conversation',
        },
        sender: {
            type: String,
        },
        
        text: {
            type: String,
        },
    },
    { timestamps: true }
)

const MessageModel = mongoose.model('Message', MessageSchema)

export default MessageModel