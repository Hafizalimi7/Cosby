const express = require("express")
const cors = require("cors")

const product = require("./products")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req,res) => {
  res.send("welcome to the backend")
})

app.get("/products", (req,res) => {
  res.send(product)
})
const port = process.env.PORT || 5000

app.listen(port, console.log(`server is running on port ${port}`))