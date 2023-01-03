const express = require('express');
const port = 3002;
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const userModel = require('./models/user.model');

app.use(cors());
app.use(express.json());

// connect to database
mongoose.connect("mongodb+srv://admin:admin@cluster0.lptfhbe.mongodb.net/User")

//Routes

app.post("/signup", (req, res) => {
    const { username, email, password } = req.body
    userModel.findOne({ username: username }, (err, user) => {
        if (user) {
            res.send({ message: "User already registered" });
        } else {
            const userm = new userModel({
                username,
                email,
                password
            })
            userm.save((err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ message: "Inserted" })
                }
            });
        }
    })
})

app.listen(process.env.PORT || 3002, () => {
    console.log(`You are connected to port ${port}`)
})