require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');


const app = express();
const port = 5000;
const server = http.createServer(app);

// // ------------------requireing the routes----------------------------------

const user = require("./route/user");
const message = require("./route/messages");
const webSocket = require('./websocket');


app.use(express.json())
app.use(express.urlencoded(true));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URI,
    credentials: true
}));

async function main(){
    await mongoose.connect(`${process.env.DATABASE_URI}`);
}

main().then(()=>{
    console.log("Connected to database.")
})
.catch((error)=>{
    console.error(error)
})

app.use("/api", user);
app.use("/api", message);

// // -----------------------websocket-----------------------------

const io = new Server(server,{
    cors:{
        origin:  process.env.FRONTEND_URI,
        credentials: true, 
    }
})


webSocket(io);
// io.on("connection", (socket)=>{
//     console.log(socket.id)

//     socket.on("disconnect", ()=>{
//         console.log("disconnected");
//     })
// })

server.listen(port, ()=>{
    console.log(`server listeining on port: ${port}`);
})  