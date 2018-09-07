const express = require('express');
const Router = express.Router();


const UserModel = require('../models/user');
Router.get('/showallusers',(request,response)=>{
    UserModel.find({}).exec((error,data)=>{
        response.send(data);
    })
})

Router.get('/removeallusers',(request,response)=>{
    UserModel.remove({}).exec((error)=>{
        response.send('All users removed');
    })
})

module.exports = Router;