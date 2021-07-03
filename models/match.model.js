const mongoose = require('mongoose');
const Schema = mongoose.Schema


const matchSchema = new Schema({

    eventId : {

        type: Schema.Types.ObjectId,
        ref: 'Event'

    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    
}) 


  const Match = mongoose.model('Match', matchSchema)

  module.exports = Match

