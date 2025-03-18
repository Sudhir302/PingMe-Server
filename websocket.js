const MessageModel = require('./model/message');
const onlineUserId = {};

const webSocket = (io)=>{
    io.on("connection",(socket) =>{
        console.log("Socket id", socket.id);

        socket.on("userOnline", (userId)=>{
            console.log(userId); 
            onlineUserId[userId] = socket.id;
        })
        

        socket.on("sendMessage", async(messageData)=>{

            const senderId = messageData.senderId;
            const message = messageData.message;
            const receiverId = messageData.receiverId;



            const newMessage = new MessageModel({
                senderId: senderId,
                message: message,
                receiverId: receiverId,
                createdAt: new Date(),
            })

            try {
                await newMessage.save(); 
            } catch (error) {
                console.error("Error saving message:", error)
            }
            const receiverSocketId = onlineUserId[receiverId];
            if(receiverSocketId){
                const msg = {
                    senderId: senderId,
                    receiverId: receiverId,
                    message: message,
                    createdAt: newMessage.createdAt,
                }
                io.to(receiverSocketId).emit("receivedMessage", msg);
            }
            else{
                console.log("reciver is offline");
            }
            })
        socket.on("disconnect", ()=>{
            const disconnectedUserId = Object.keys(onlineUserId).find((key)=> onlineUserId[key]=== socket.id);

            if(disconnectedUserId){
                delete onlineUserId[disconnectedUserId];
                console.log("disconnected", disconnectedUserId)
            }
        });
    })
}

module.exports = webSocket; 
