const express = require('express');
const seesion = require("express-session");
const exphbs = require('express-handlebars');
const { urlencoded } = require('express');
const PORT = process.env.PORT || 3000;


const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(seesion);
const app = express();
const Users = require('./models/user');

const MONGODB = process.env.MONGODB || 'mongodb://localhost/users'; 


mongoose.connect(MONGODB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}); 

app.use(express.urlencoded({extended : true}));

app.engine('handlebars',exphbs({defaultLayout : 'main'}));
app.set('view engine','handlebars');


app.use(seesion({
    name:'sid',
    secret:'secretkey',
    store:new mongoStore({mongooseConnection:mongoose.connection}),
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge : 1000*60*60*24}
}));

const ridirecttoDashboard = (req,res,next)=>{
    if(req.session.username){
        res.redirect('/dashboard');
    }else{
        next();
    }
}

const protectHome = (req,res,next)=>{
    if(!req.session.username){
        res.redirect('/login');
    }else{
        next();
    }
}


app.get('/',ridirecttoDashboard,(req,res)=>{
    res.redirect('/login');
});

app.get('/dashboard',protectHome,(req,res)=>{
   
    const username = req.session.username;
    res.render('dashboard',{username});
});

app.get('/login',ridirecttoDashboard,(req,res)=>{
    res.render('login');
});

app.get('/register',ridirecttoDashboard,(req,res)=>{
    res.render('register');
});

//post methods

app.post('/register',(req,res)=>{
    const newUser = {
        
        username : req.body.username,
        password : req.body.password,
        phone : req.body.phone,
        email : req.body.email,
        pin : req.body.pin
    }
    // Users.push(newUser);
    var newman = new Users(newUser);
    newman.save();
    res.redirect('/login');
});

app.post('/login',(req,res)=>{
  
    const username = req.body.username;
    const password = req.body.password;
   
    Users.findOne({username : username, password : password},(err,user)=>{
        console.log(user);
        if(user){
            req.session.username = user.username;
            res.redirect('/dashboard');
        }else{
            const msg = 'Invalid Password';
            res.render('login',{msg}); 
        }
    })
});
 
app.post('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.redirect('dashboard');
        }
        res.clearCookie('sid');
        res.redirect('/');
    })
});


app.listen(PORT,()=>{console.log(`http://localhost:${PORT}`)});