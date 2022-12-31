const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const generateAuthToken = require("../utils/genAuthToken");
const router = express.Router();

router.post("/", async (req, res) => {//validating data
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);//storing error message

  let user = await User.findOne({ email: req.body.email });//checks if user doesnt exist
  if (!user) return res.status(400).send("Invalid email or password...");

  const isValid = await bcrypt.compare(req.body.password, user.password)
  if(!isValid) return res.status(400).send("Incorrect password...");//checks if password is corrt

  const token = generateAuthToken(user);

  res.send(token);
});

module.exports = router;