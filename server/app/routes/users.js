import express from "express";
var router = express.Router();
require('dotenv').config();
import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";
const withAuth = require('../middlewares/auth')


router.post('/register', async function(req, res) {
        console.log("REGISTER ENDPOINT => ", req.body);
        const { name, email, password } = req.body;
        // validation
        if (!name) return res.status(400).send("Name is required");
        if (!password || password.length < 6)
        return res
            .status(400)
            .send("Password is required and should be 6 characters long");
        const exist = await User.findOne({ email });
        if (exist) return res.status(400).send("Email is taken");
        // hash password
        const hashedPassword = await hashPassword(password);

        const user = new User({ name, email, password: hashedPassword });
        try {
        await user.save();
        // console.log("REGISTERED USE => ", user);
        return res.json({
            ok: true,
        });
        } catch (err) {
        console.log("REGISTER FAILED => ", err);
        return res.status(400).send("Error. Try again.");
        }

  });

  router.post('/login', async (req, res) => {

            // console.log(req.body);
        try {
            const { email, password } = req.body;
            // check if our db has user with that email
            const user = await User.findOne({ email });
            if (!user) return res.status(400).send("No user found");
            // check password
            const match = await comparePassword(password, user.password);
            if (!match) return res.status(400).send("Wrong password");
            // create signed token
            const token = jwt.sign({ email }, process.env.JWT_TOKEN, {
            expiresIn: "7d",
            });
            user.password = undefined;
            res.json({
            token,
            user,
            });
        } catch (err) {
            console.log(err);
            return res.status(400).send("Error. Try again.");
        }

  })

  router.get('/', withAuth, async (req, res) => {
    try {
        let users = await User.find({_id: {$nin:  req.user._id}}).select("_id name");
        res.json(users)
    } catch (error) {
        res.json({error: error}).status(500);
    }
})



module.exports = router;
