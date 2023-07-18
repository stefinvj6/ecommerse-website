const express = require("express")
const router = express.Router()
const category = require("../Model/categorySchema")

router.post("/",async(req,res)=>{
    try {
        const postCategory = new category(req.body)
        await postCategory.save()
        res.status(200).json(postCategory)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get("/",async(req,res)=>{
    try {
        const getCategory = await category.find()
        res.status(200).json(getCategory)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/:id',async(req, res)=>{
    try {
      const getCategory = await category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.status(200).json(getCategory);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get category' });
    }
  });

module.exports=router;