const express = require("express")
const router = express.Router()
const feedback = require("../Model/feedbackSchema")
const authorizeUser = require("../Middleware/AuthMiddleware")

router.post("/",authorizeUser,async(req,res)=>{
    try {
        const postFeedback = new feedback({user:req.user._id, ...req.body})
        await postFeedback.save()
        res.status(200).json(postFeedback)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get("/",async(req,res)=>{
    try {
        const getFeedback = await feedback.find()
        res.status(200).json(getFeedback)
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports= router