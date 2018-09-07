module.exports = (request,response,next)=>{
    if(request.session.userId){
        next();
    }else{
        response.redirect('/auth/login');
    }
}