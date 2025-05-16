const { Router } = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../Model/userModel");
require("dotenv").config();

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (email !== undefined) {
    const userExist = await UserModel.findOne({ email });
    console.log(userExist, "user")
    if (!userExist) {
      bcrypt.hash(password, 5, async function (err, hash) {
        console.log(hash, "hash")
        if (hash) {
          const user = UserModel({ email, password: hash });
          await user.save();
          res.status(201).send({ message: "User Registered Successfully!" });
        } else {
          res.status(500).send({ error: "Something went wrong!" });
        }
      });
    } else {
      res.status(200).send({ message: "User already registered!" });
    }
  }
});

module.exports = userRouter;
