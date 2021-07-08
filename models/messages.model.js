const mongoose = require('mongoose')
const Schema = mongoose.Schema
const messageSchema = new Schema(
{
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }] ,
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true
})

const Message = mongoose.model('Messages', messageSchema)
    
module.exports = Message