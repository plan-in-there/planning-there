const mongoose = require('mongoose')
const Schema = mongoose.Schema



const matchSchema = new Schema({
    event: {
        ObjectId
    },
    guest: {
        ObjectId
    }
})

const Match = mongoose.model('Match', matchSchema)

module.exports = Match