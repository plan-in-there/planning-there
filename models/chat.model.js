const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    // user: USERiD,
    // CHAT: chatid
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
}, {
    timestamps: true
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
