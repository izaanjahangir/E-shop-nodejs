const express = require('express');
const Router = express.Router();


Router.get('/',(request,response)=>{
    response.render('ad');
})

module.exports = Router;