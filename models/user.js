const mongoose = require('mongoose');
const schema = mongoose.Schema({
    username:{
        type: String,
        required: [true,"Username is required"]
    },
    email:{
        type: String,
        required: [true,"Email is required"]
    },
    password:{
        type: String,
        required: [true,"Password is required"]
    }
});

const model = mongoose.model('User',schema);
module.exports = model;