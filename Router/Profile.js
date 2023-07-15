const express = require("express")
const router = express.Router()
const profile = require('../Model/profileSchema')
const authorizeUser = require("../Middleware/AuthMiddleware")

router.post("/",authorizeUser,async(req,res)=>{
    try {
        const postProfile = new profile({user:req.user.id, ...req.body})
        await postProfile.save()
        res.status(200).json(postProfile)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get("/",async(req,res)=>{
    try {
        const getProfile = await profile.find()
        res.status(200).json(getProfile)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get("/myprofile", authorizeUser, async (req, res) => {
    try {
      const profiles = await profile.findOne({ user: req.user._id });
      if (!profiles) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.status(200).json(profiles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profiles", error });
    }
});

router.put("/myprofile",authorizeUser,async(req,res)=>{
    try {
        const updateProfile = await profile.findOneAndUpdate({user: req.user._id },req.body,{ new: true })
        res.status(200).json(updateProfile)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.delete("/myprofile", authorizeUser, async (req, res) => {
    try {
      const deletedProfile = await profile.findOneAndDelete({ user: req.user._id });
      if (!deletedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

module.exports = router