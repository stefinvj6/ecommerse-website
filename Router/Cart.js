const express = require("express")
const router = express.Router()
const cart = require("../Model/cartSchema")
const authorizeUser = require("../Middleware/AuthMiddleware")

router.post("/",authorizeUser,async(req,res)=>{
    try {
        const postCart = new cart({user:req.user._id, ...req.body})
        await postCart.save()
        res.status(200).json(postCart)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get("/",authorizeUser,async(req,res)=>{
    try {
        const getCart = await cart.find({ user: req.user._id })
        res.status(200).json(getCart)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.delete("/:id", authorizeUser, async (req, res) => {
    try {
      const deleteCart = await cart.findOneAndDelete({ user: req.user._id, _id: req.params.id });
      res.status(200).json(deleteCart);
    } catch (error) {
      res.status(404).send(error);
    }
  });  

module.exports= router