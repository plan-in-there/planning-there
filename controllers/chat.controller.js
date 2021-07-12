const mongoose = require('mongoose')
const Chat = require('../models/chat.model')
const Event = require('../models/event.model')
const User = require('../models/user.model')
const Match = require('../models/match.model')
const Message = require('../models/message.model')

module.exports.allUserChats = (req, res, next) => {
    Chat.find({users: req.user.id})
        .populate('users')
        .then(chats => {
            res.render('chat/chats', {
                chats,
                title: 'This are your messages'
            })
        })
        .catch(next)
}

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

    const newChat = new Chat({ users: [req.params.id, req.user._id] })
     Chat.find({ users: { $all: [req.params.id, req.user._id] }})
        .then(chat => {
            if (chat.length) {
                res.redirect(`/user-profile/chat/${chat[0]._id}`)
            } else {
                return newChat.save()
                .then(chat => {
                    res.redirect(`/user-profile/chat/${chat._id}`)
                })
            }
        })
        .catch(next)

}



module.exports.newMessage = (req, res, next) => {
    Chat.findById(req.params.id)
        .then(chat => {
            return Message.create({ 
                message: req.body.message, 
                user: req.user._id 
            })
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



