module.exports = (request,response,next)=>{
    if(request.session.userId){
        response.redirect('/');
    }else{
        next();
    }
}