const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user.model')
const Chat = require('./chat.model')
const messageSchema = new Schema(
{
    message: {
        type: String
        
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }
}, {
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema)
    
module.exports = Message