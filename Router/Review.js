const express = require("express")
const router = express.Router()
const review = require("../Model/reviewSchema")
const authorizeUser = require("../Middleware/AuthMiddleware")

router.post("/",authorizeUser,async(req,res)=>{
    try {
        const postReview = new review({user:req.user._id, ...req.body})
        await postReview.save()
        res.status(200).json(postReview)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get("/",async(req,res)=>{
    try {
        const getReview = await review.find()
        res.status(200).json(getReview)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get("/:id",async(req,res)=>{
    try {
        const getReview = await review.findById(req.params.id)
        if (!getReview) {
            return res.status(404).json({ error: 'Review not found' });
          }
        res.status(200).json(getReview)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get("/reviews/:productId", async (req, res) => {
    try {
      const { productId } = req.params;
      const reviews = await review.find({ product: productId }).populate("user");
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
});

router.delete("/:id", authorizeUser, async (req, res) => {
    try {
      const deleteReview = await review.findOneAndDelete({ user: req.user._id, _id: req.params.id });
      res.status(200).json(deleteReview);
    } catch (error) {
      res.status(404).send(error);
    }
  }); 

module.exports= router