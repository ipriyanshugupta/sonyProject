const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    userId: Number,
    name: String,
    email: String,
    phone: Number,
})

const User = mongoose.model(UserSchema, user)

module.export  = User