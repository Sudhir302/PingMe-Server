const express = require('express');
const MessageModel = require('../model/message')
const router = express.Router();

// --------------------sending message from database--------------

router.get('/messages/:senderId/:receiverId', async (req, res)=>{
    try {
        const {senderId, receiverId} = req.params;
        const messages = await MessageModel.find({
            $or:[
                { senderId, receiverId},
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({createdAt: 1});
        res.json(messages);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
})

module.exports = router; 