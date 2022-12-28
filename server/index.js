const express = require("express")
const cors = require("cors")//cors relaxs the security applied to an API


const product = require("./products")//from product file

const app = express()//creating an object to call different methods



app.use(express.json())//configuring a middleware , inccrease the functionailty
app.use(cors())//allows to access to nodejs api from react application

app.get("/", (req,res) => {//res is whats coming in from the frontend and res is what gives out from an api
  res.send("welcome to the backend")//shows on the browser
})

app.get("/products", (req,res) => {
  res.send(product)//sends data from product file and shows on browser
})
const port = process.env.PORT || 5000


app.listen(port, console.log(`server is running on port ${port}`))//shows when backend port is running

