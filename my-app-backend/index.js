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

//post data to database
app.post("/signup", (req, res) => {
    const { username, email, password } = req.body
    userModel.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registered",user:user });
        } else {
            const userm = new userModel({
                username: username,
                email: email,
                password: password
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

//get data from database
app.post("/login", async (req, res) => {
    const { username, password } = req.body
    userModel.findOne({ username: username }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successfull", user: user })
            } else {
                res.send({ message: "Incorrect password" })
            }
        }
        else {
            res.send({ message: "User Not Found !!" });
        }
    })
});

//read data from database
app.get("/read",(req,res)=>{
    userModel.find({},(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})

app.listen(process.env.PORT || 3002, () => {
    console.log(`You are connected to port ${port}`)
})