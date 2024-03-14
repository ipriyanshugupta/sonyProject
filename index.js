require('dotenv').config();
const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();
const mongoose = require("mongoose")
const PORT = process.env.PORT || 3000;
const User = require('./models/users')
const auth = require("./middleware/auth")

 app.use(auth)
//Design and implement a restful API endpoint that handles CRUD (Create,Read, Update,Delete) operation for a resource  such as a "User" or "Product.

mongoose.connect(process.env.MONGO_URI)


app.post('createUser',async (req,res)=>{
    const {userId, name, email, phone} = req.body;
    const data = await new User({userId, name, email, phone})
    data.save();
    res.json({
        statusCode: 201, 
        message: "User created successfully"
    })
});

app.get('getAllUser', async (req,res)=>{
    const data = await User.find();
    res.json({
        statusCode: 200, 
        data
    })
});

app.get('getUser/:id', async (req,res)=>{
    const id = req.param.id
    const data = await User.find({id});
    res.json({
        statusCode: 200, 
        data
    })
});

app.put('updateUser/:id', async (req, res)=>{
    const id = req.param.id;
    const updateData = req.body;
    const data = await User.update(updateData)
    if(data) 
    return res.json({
        statusCode: 200, 
        message: "User updated"
    })
    res.json({
        statusCode: 200, 
        message: "error updating user"
    })
})

app.delete('deleteUser/:id', async (req, res)=>{
    const id = req.param.id;
    const data = await User.delete({id})
    if(data) 
    return res.json({
        statusCode: 200, 
        message: "User deleted"
    })
    res.json({
        statusCode: 200, 
        message: "error deleting user"
    })
})


app.listen(PORT, ()=>{
    console.log("Server started")
})