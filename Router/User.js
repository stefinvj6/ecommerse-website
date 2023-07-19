const express = require("express")
const router = express.Router()
const user = require("../Model/userSchema")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config();
const saltRounds = 10;


// Get all the user
router.get("/",async(req,res)=>{
    try {
        const getUser = await user.find().select("-password");
        res.status(200).json(getUser)
    } catch (error) {
        res.status(404).send(error)
    }
})


// Signup
router.post("/",async(req,res)=>{
    try {
        const postUser = new user(req.body)
        const password = req.body.password
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        postUser['password']=hashedPassword
        await postUser.save()
        res.status(200).json({Message:"Signup Success",postUser})
    } catch (error) {
        res.status(404).send({Message:"User access failed"})
    }
})

// To generate a random key for TOKEN_SECRET
router.get("/random",async(req,res)=>{
    try {
        const secret = crypto.randomBytes(64).toString('hex')
        res.status(200).send(secret)
    } catch (error) {
        res.status(404).send(error)
    }
})

// TO Get Token
function generateAccessToken(user) {
    const { username, _id } = user;
    const token = jwt.sign({ username, _id },process.env.TOKEN_SECRET,{expiresIn : '1800s'});
    return token;
}

// Login
router.post("/login",async(req,res)=>{
    try {
        const {username,password} = req.body
        const loginUser = await user.find({username:username})
        let validUser = null;
        for (const userObj of loginUser) {
            const hashedPassword = userObj.password
            const comparisonResult = await bcrypt.compare(password,hashedPassword); 
            if(comparisonResult){
                validUser=userObj;
                break;
            }
        }
        if (!validUser) {
            return res.status(401).json({Message:"Invalid user or password"})
        }
        const token = generateAccessToken({
            username:validUser.username,
            _id:validUser._id
        })   
        res.status(200).json({Message:"Login Successfull",Token:token})
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports=router;