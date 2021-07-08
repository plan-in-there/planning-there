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
    // Tengo el user id y el que esta logged in.
    // Busco si hay un chat que tenga a esos dos,
    // si no, crea uno. Cuando lo creo,
    // lo redirig a showChat y le paso el objeto chat que he creado.
}

module.exports.showChat = (req, res, next) => {
  const chat = req.chat 
    render("/html", {chat})
}

module.exports.newMessage = (req, res, next) => {
    // Un form en el front end que al submit guarda
    // un mensaje en el chat
    const chat = req.chat
    const message = req.body.message
    // save()
}