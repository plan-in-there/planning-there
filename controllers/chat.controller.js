const mongoose = require('mongoose')
const Chat = require('../models/chat.model')
const Event = require('../models/event.model')
const User = require('../models/user.model')
const Match = require('../models/match.model')
const Message = require('../models/message.model')

module.exports.getChat = (req, res, next) => {
    Chat.findById(req.params.id)
        .populate('users')
        .populate('messages')
        .then(chat => {
            res.render('chat/form', { chat })
        })
        .catch(next)
}


module.exports.doCreate = (req, res, next) => {
    console.log([req.params.id, req.user.id])
    const newChat = new Chat({ users: [req.params.id, req.user._id] })

     Chat.find({ users: { $in: [req.params.id, req.user._id] }})
        .then(chat => {
            if (chat) {
                res.redirect(`/user-profile/chat/${chat[0]._id}`)
            } else {
                return newChat.save()
                .then(chat => {
                    console.log(chat)
                    res.redirect(`/user-profile/chat/${chat._id}`)
                })
            }
        })
        .catch(next)

}



module.exports.newMessage = (req, res, next) => {
    Chat.findById(req.params.id)
        .then(chat => {
            return Message.create({ message: req.body.message })
            .then(message => {
             return Chat.updateOne(
                    { _id: chat._id},
                    { $push: { messages: message._id}} 
                    )
                    .then(() => {
                        res.redirect(`/user-profile/chat/${chat._id}`)
                    })
            })
        })
        .catch(next)
}