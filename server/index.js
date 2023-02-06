const express = require("express")
const cors = require("cors")//cors relaxs the security applied to an API
const mongoose = require("mongoose")
const register  = require("./routes/register")
const login  = require("./routes/login")
const stripe = require("./routes/stripe")


const product = require("./products")//from product file

const app = express()//creating an object to call different methods

require("dotenv").config()

app.use(express.json())//configuring a middleware , inccrease the functionailty
app.use(cors())//allows to access to nodejs api from react application
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/stripe", stripe);


app.get("/", (req,res) => {//res is whats coming in from the frontend and res is what gives out from an api
  res.send("welcome to the backend")//shows on the browser
})

app.get("/products", (req,res) => {
  res.send(product)//sends data from product file and shows on browser
})
const port = process.env.PORT || 5000
const uri = process.env.DB_URI

app.listen(port, console.log(`server is running on port ${port}`))//shows when backend port is running

mongoose.set('strictQuery', true);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb Connection Successful"))
  .catch((err) => console.log("Failed To Connect", err.message));//shows when connection failed
