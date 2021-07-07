const mongoose = require('mongoose')
const Message = require('../models/message.model')


module.exports.create = (req, res, next) => {res.render('user/messages')}

module.exports.doCreate = (req, res, next) => {
    myMessage = { message } = req.body
    myMessage.from = req.user.id
    myMessage.chat = req.params.idCHAT
    myMessage.message = message

    Message.create(myMessage)
        .then(message => res.redirect('/user-profile/messages/req.params.idCHat'))
        .catch(next)
}