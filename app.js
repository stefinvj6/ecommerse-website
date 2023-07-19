const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 8050;
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config();

main().then((result) => {
    console.log("MongoDB Connected")
}).catch((err) => {
    console.log(err)
});
async function main() {
   await mongoose.connect(process.env.DB)
}
app.use(express.json())
app.use(cors())

const users = require("./Router/User")
app.use('/user',users)

const profiles = require("./Router/Profile")
app.use('/profile',profiles)

const categories = require("./Router/Category")
app.use("/category",categories)

const products = require("./Router/product")
app.use("/product",products)

const carts = require("./Router/Cart")
app.use("/cart",carts)

const reviews = require("./Router/Review")
app.use("/review",reviews)

const feedbacks = require("./Router/Feedback")
app.use("/feedback",feedbacks)

app.listen(port,()=>{
    console.log(`Your port is live on: ${port}`)
})