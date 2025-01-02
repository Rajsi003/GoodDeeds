const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please enter a name']
    },
    email : {
        type : String,
        required : [true, 'Please enter a email'],
        unique : true
    },
    profilePic: {
        type: String, // Stores the URL or path to the image
        default: 'default-profile-pic.jpg' // Optional: Provide a default profile picture
    },
    password : {
        type : String,
        required : [true, 'Please enter a password']
    },
   },{
    timestamps : true
   }
)

module.exports = mongoose.model('User',userSchema)