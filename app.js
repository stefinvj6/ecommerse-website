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

app.listen(port,()=>{
    console.log(`Your port is live on: ${port}`)
})