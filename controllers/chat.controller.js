// doCreate 
// req.paramas.id =  el del usuario con el que quiero hablar
// req.user._id
// Chat.save()
// .populate(users)
//.then(chat =>
// vista que será tipo users/profile/chats/${chat.id}
//)

// const Chat = require("../models/message.model");


// doChat => {
    // Chat.findById(REQ.PARAMS.ID)
    // .populate(meessages)
    // .popiulate(users)
// renderiza la vista del chat
//}

const mongoose = require('mongoose')
const Chat = require('../models/chat.model')
const Event = require('../models/event.model')
const User = require('../models/user.model')
const Match = require('../models/match.model')

module.exports.getChat = (req, res, next) => {
    Chat.findById(req.params.id)
        .populate('users')
       
        .then(chat => {
            res.render('chat/form', { chat })
        })
        .catch(next)
}

module.exports.showChat = (req, res, next) => {
  const chat = req.chat 
    render("/html", {chat})
}

//Chat.find({ users.includes(req.param.id) &&  req.user._id})
// .then(chat => {
//     if (!chat) {
//         chat = req.body
//         Chat.create(chat)
//             .then(res.render('chat/form'))
//     } else {
module.exports.doCreate = (req, res, next) => {
    const chat = {
        users: [req.params.id, req.user._id],
        messages: []
    }
    Chat.create(chat)
    .then(chat => {
        res.redirect(`user-profile/chat/${chat._id}`)
    })
    .catch(next)
}


module.exports.newMessage = (req, res, next) => {
    // Un form en el front end que al submit guarda
    // un mensaje en el chat
    const chat = req.chat
    const message = req.body.message
    // save()
}