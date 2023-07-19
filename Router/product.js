const express = require("express")
const router = express.Router()
const product = require("../Model/productSchema")

router.post("/",async(req,res)=>{
    try {
        const postProduct = new product(req.body)
        await postProduct.save()
        res.status(200).json(postProduct)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get("/",async(req,res)=>{
    try {
        const getProduct = await product.find()
        res.status(200).json(getProduct)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get("/:id",async(req,res)=>{
    try {
        const getById = await product.findById(req.params.id)
        if (!getById) {
            return res.status(404).json({ error: 'Product not found' });
          }
        res.status(200).json(getById)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get("/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const getProduct = await product.find({ category: category })
      res.status(200).json(getProduct);
    } catch (error) {
      res.status(404).send(error);
    }
  });

router.put("/:id",async(req,res)=>{
    try {
        const editProduct = await product.findByIdAndUpdate(req.params.id,req.body)
        res.json(editProduct)
    } catch (error) {
        res.send(error)
    }
})
  

module.exports=router;