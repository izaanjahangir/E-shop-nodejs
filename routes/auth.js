//  Requiring modules
const express = require('express');
const Router = express.Router();


// Requiring models
const UserModel = require('../models/user');


// Prevent Auth if already authenticated middleware
const preventAuth = require('../middlewares/preventAuth');



// GET routes
Router.get('/signup', preventAuth ,(request,response)=>{
    response.render('signup');
})

Router.get('/login', preventAuth ,(request,response)=>{
    response.render('login');
})

Router.get('/logout',(request,response)=>{
    console.log('Logout')
    request.session.destroy(()=>{
        console.log('Session destroyed')
        response.redirect('/auth/login')
    })
})


// POST routes
Router.post('/signup',(request,response)=>{
    const query = {username: request.body.username};
    UserModel.find(query).exec((error,data)=>{
        if(data.length < 1){
            const user = new UserModel(request.body);
            console.log('User not found')
            user.save((error,data)=>{
                if(error){
                    response.send({isError: true,message: 'Unexpected Error'})
                    return console.log(error)
                }else{
                    request.session.userId = data._id;
                    return response.send({isError: false,data});
                }
            })        
        }else{
            console.log('User found')
            response.send({isError: true,message:'User found'})
        }
    })
})

Router.post('/login',(request,response)=>{
    const query = {username: request.body.username};
    UserModel.find(query).exec((error,data)=>{
        if(data.length < 1){
            console.log('User not found')
            response.send({isError: true,message:'User not found'})
        }else{
            data = data[0];
            if(data.password === request.body.password){
                console.log('Password matched');
                request.session.userId = data._id;
                response.send({isError: false,message:'Password Matched'})                
            }else{
                console.log('Password is wrong');
                response.send({isError: true,message:'Password is Wrong'})                                
            }
        }
    })
})
module.exports = Router;