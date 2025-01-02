const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User',

    },
    text : {
        type : String,
        required : [true , 'please enter post description'],

    },
    image: {
        type: String, // URL or path to an image
        default: '',
    }


},{
    timestamps : true,
})

module.exports = mongoose.model('Post',postSchema)