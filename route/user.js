require('dotenv').config();
const express = require('express');
const router = express.Router();
const userModel = require("../model/users");
const hashing = require('../functions/hashing');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifytoken')
const bcrypt = require('bcrypt')

const upload = require("../imgStorage")



// Creating a user 
router.post("/signup", async (req, res)=>{
    try {
        const {userName, signupEmail, signupPassword} = req.body;
        const isUser = await userModel.findOne({email: signupEmail});
        const hashedPassword = await hashing(signupPassword);
        if(isUser){
            return res.status(400).json({message: "User Already Exist", success: false});
        }
        else{
            const newUser = new userModel({
                username: userName,
                email: signupEmail,
                password: hashedPassword,
            })
            await newUser.save();
            return res.status(201).json({message: "Account Successfuly Created", success: true});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error", success: false});
    }
})

//login
router.post("/login", async (req, res)=>{
    try {
        const {loginEmail, loginPassword} = req.body;
        const isUser = await userModel.findOne({email: loginEmail});
        const isValidPassword = await bcrypt.compare(loginPassword, isUser.password)

        if(!isUser){
            return res.status(404).json({message: "Email doesn't exist", success: false});
        }
        if(isUser && isValidPassword){
            const token = jwt.sign({userId: isUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
            res.cookie("token", token,{
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 60*60*1000
            })
            return res.status(200).json({message: "Succesfully Logged in", success: true, userId: isUser._id}); 
        }
        else{
            return res.status(403).json({message: "Unathorised User", success: false})
        } 
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error", success: false});
    }
})

//update password
router.put("/update/password", async(req, res)=>{
    try {
        const {loginEmail, newPassword} = req.body
        const isUser = await userModel.findOne({email: loginEmail});
        if(!isUser){
            return res.status(404).json({message: "Check Your Email", success: false});
        }
        const hashedPassword = await hashing(newPassword);
        await userModel.findByIdAndUpdate(isUser._id, {password: hashedPassword}, {new: true});
        return res.status(200).json({message: "Password Updated Successfully", success: true})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
})

//logout

router.post("/logout", (req, res) =>{
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    })
    return res.status(200).json({message: "Logged out successfully", success: true})
})

//verifying the token
router.get("/login", verifyToken, (req, res)=>{
    return res.status(200).json({
        message: "authorised", 
        userId: req.user.userId,
        success: true,
    })
})


// showing all the users

router.get("/users",verifyToken, async (req, res)=>{
    try {
        const loggedUser = req.user.userId;
        // console.log(loggedUser)
        const users = await userModel.find({_id: {$ne: loggedUser}});
        if(users.length === 0){
            return res.status(400).json({message: "No user", success: false});
        }
        return res.status(200).json({message: "All Users", allUsers: users, success: true, senderId: loggedUser});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

// -----------------------------------ProfileImage-------------------------

router.get("/profile/image/:senderId", async(req, res)=>{
    try {
        const {senderId} = req.params;
        const isUser = await userModel.findById(senderId)
        if(!isUser){
            return res.status(404).json({message:"User not found", success: false});
        }
        return res.status(200).json({message: "Profile found", success: true, image: isUser.profileImg})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "internal server error", success: false})
    }
})


// ------------------update profile image------------------------------
router.put("/profile/image/:senderId/update",upload.single("image"), async (req, res)=>{
    try {
        const {senderId} = req.params;
        const formData = req.file;
        
        if(!formData.path){
            return res.status(400).json({message: "Image is required", success: false});
        }
        const updatedUser = await userModel.findByIdAndUpdate(senderId,{profileImg: formData.path}, {new: true})
        if(!updatedUser){
            return res.status(404).json({ message: "User not found", success: false });
        }
        return res.status(200).json({message: "Profile Updated successfully", success: true})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "internal server error", success: false})
    }
})


module.exports = router