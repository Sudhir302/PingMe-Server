# PingMe-Server

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

**PingMe-Server** is the backend server for the [PingMe](https://github.com/Sudhir302/PingMe-Client) chat application. It handles user authentication, real-time messaging via Socket.IO, and database interactions using MongoDB.

---

## 📦 Features

- User Registration & Login (JWT-based)
- Real-time Chat using Socket.IO
- MongoDB integration for storing users, chats, and messages
- RESTful API for frontend communication
- CORS-enabled for frontend/backend communication
- Secure routes with middleware
- User Search functionality

---

## 👩‍💻 Technologies Used
- node.js
- express.js
- mongoDB and mongoDB Atlas
- JWT
- Cloudinary

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js installed
- MongoDB Atlas account or mongoDB
- [PingMe-Client](https://github.com/Sudhir302/PingMe-Client) (Frontend)

### Installation 
1. Clone the repository:
   ```
   https://github.com/Sudhir302/PingMe-Server.git
2. Navigate to the project directory:
   ```
   cd PingMe-Server
3. Install dependencies:
   ```
   npm install
4. Run the app:
   ```
   npm start

---

### 📁 Folder Structure
```
  PingMe-Server/
  |
  ├── functions/
  |       ├── hashing.js
  |
  ├── middlewares/
  |       ├── verifytoken.js
  |
  ├── models/
  |       ├── message.js
  |       ├── user.js
  |
  ├── route/
  |       ├── message.js
  |       ├── user.js
  |
  ├── app.js
  |
  ├── Cloudinary.js
  |
  ├── imgStorage.js
  |
  ├── websocket.js
```
---
## 🧣 Future Enhancements
- Add typing indicator
- Display notification
- Support for file/media sharing
  
## 📄 License

This project is licensed under the MIT LICENSE - see the [MIT License](./LICENSE) for details.
## Contact
Sudhir Chaudhary - csudhir302@gmail.com


