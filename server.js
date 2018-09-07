const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const connectMongo = require('connect-mongo');
const app = express();
const MongoStore = connectMongo(session);




app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

const mongoURL = 'mongodb://admin-test:adminTest123@ds225442.mlab.com:25442/izaan-eshop';


// Connection to mongodb via mongoose
// mongoose.connect('mongodb://localhost/eshop');

// Connection to mLab via mongoose
mongoose.connect(mongoURL);
const conn = mongoose.connection;


conn.once('open', ()=> console.log('Connected to eshop database'))
    .on('error', (error)=> console.log(error))



// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
// app.use(bodyParser.json())




app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));



const AdModel = require('./models/ad');
const UserModel = require('./models/user');


// app.get('/images',(req,res)=>{
//   AdModel.find({}).exec((error,data)=>{
//     res.render('/',{ad: data});
//   })
// })


// Protect routes middleware
const protectRoutes = require('./middlewares/protectRoutes');


// Middleware for session
app.use(session({
    secret: 'mySecret',
    store: new MongoStore({
        mongooseConnection: conn
    })
}))




app.use('/auth',require('./routes/auth'));
app.use('/ad',require('./routes/ad'));
app.use('/test',require('./routes/test'));



app.post('/upload', (req, res) => {
    console.log('POST on /upload')
    UserModel.findById(req.session.userId).exec((error,data) => {
        const newAd = new AdModel(req.body);
        newAd.owner = data.username;
        newAd.ownerId = req.session.userId;
        console.log(newAd);
        newAd.save(()=>{
          res.json({message:'image uploaded'});
        })
    })
});


// Home route
app.get('/' ,(request,response)=>{
    response.locals.userId = request.session.userId || null;
    AdModel.find({}).exec((error,data)=>{
        response.render('index',{ads: data});
        // response.json({ad:data[0]})
      })
})

// Post an ad route
app.get('/upload' ,protectRoutes,(request,response)=>{
    response.locals.userId = request.session.userId || null;
    response.render('upload');
})
app.listen('3000',()=> console.log('Server started on port 3000'));