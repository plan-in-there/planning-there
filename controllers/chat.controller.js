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


//Chat.find({ users.includes(req.param.id) &&  req.user._id})
// .then(chat => {
//     if (!chat) {
//         chat = req.body
//         Chat.create(chat)
//             .then(res.render('chat/form'))
//     } else {
/* module.exports.doCreate = (req, res, next) => {
    const chat = {
        users: [req.params.id, req.user._id],
        messages: []
    }
    Chat.create(chat)
        .then(chat => {
            res.redirect(`/user-profile/chat/${chat._id}`)
        })
        .catch(next)
} */

module.exports.doCreate = (req, res, next) => {
    const chat = {
        users: [req.params.id, req.user._id],
        messages: []
    }
    Chat.findById(req.params.id)
        .then(chat => {
            if (chat) {
                res.redirect(`/user-profile/chat/${chat._id}`)
            } else {
               return Chat.create(chat)
                    .then(chat => {
                        res.redirect(`/user-profile/chat/${chat._id}`)
                    })
            }
        })
        .catch(next)
}



module.exports.newMessage = (req, res, next) => {
   
    console.log("new message")
    Chat.findById(req.params.id)
        .then(chat => {
            console.log("found chat")
            const message = req.body.message
           return  Message.create({message})
            .then(message => {
                console.log("new message inside chat")
             return Chat.updateOne(
                    { _id: chat._id},
                    { $push: { messages: message}} 
                    )
                    .then(() => {
                        res.redirect(`/user-profile/chat/${chat._id}`)
                    })
            })
        })
        .catch(next)
}