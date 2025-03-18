const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    message:{
        type: String,
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

const Message = mongoose.model("Message", messageSchema);

module.exports = Message