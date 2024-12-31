const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    text : {
        type : String,
        required : [true , 'please enter post description'],

    },

},{
    timestamps : true,
})

module.exports = mongoose.model('Post',postSchema)