const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String, 
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    profileImg: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    }
})

const User = mongoose.model("User", userSchema);
 
module.exports = User;