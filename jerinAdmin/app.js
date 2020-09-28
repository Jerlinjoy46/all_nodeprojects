const express= require("express");
const path = require('path');
const mongoose = require("mongoose");
//handlebar 
const exphbs  = require('express-handlebars');
const app = express();
const bcrypt = require('bcrypt');

const MONGODB = process.env.MONGODB || "mongodb://localhost/users"
mongoose.connect(MONGODB);

const users = require("./models/user");

const cookieParser = require('cookie-parser')
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('view')); 



const session = require('express-session');
const  TWO_HOURS = 1000 * 60 * 60 * 2
const NODE_ENV = 'development'
const SESS_LIFETIME = TWO_HOURS
const IN_PROD = NODE_ENV === 'production'
SESS_NAME = 'sid'
SESS_SECRET = 'ssh!quiet,it\'asecret!';
app.use(cookieParser())

const bodyParser = require('body-parser');
const user = require("./models/user");
const { response } = require("express");
app.use(bodyParser.urlencoded({
    extended: true
})) 

const MongoStore = require('connect-mongo')(session);

app.use(session({
    name: SESS_NAME,
    resave:false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    store:new MongoStore({mongooseConnection : mongoose.connection}),
    cookie:{
        maxAge: SESS_LIFETIME,
        sameSite: true,   
        secure: IN_PROD,   
      

        
    }
})) 

const login = (req,res,next)=>{
    if(!req.session.unameDB){
        res.redirect('/')
    }else{ 
           next ()
}}
 const  welcome= (req,res,next) => {
if(req.session.unameDB){
    res.redirect('/welcome')
}else{
    next()
}
} 

app.get('/',welcome,(req,res) => res.render('home'));

app.get('/welcome',login,(req,res,next) => {
    users.find({}).lean().exec((err,data) => {
        res.render('index2.handlebars',{users:data})
    })
      
})
const unameDB ="admin"
const pswDB ="admin"
app.post("/login",(req,res) => {
    const { uname,psw } = req.body;
    if(uname === unameDB && psw === pswDB){ 
       req.session.unameDB=uname;
    res.redirect('/welcome') 
    } else{
        
        res.redirect('/')  
    } 
});  




app.post('/logout',(req,res) => { 

    req.session.destroy(err => {
        if(err) { 
            
            return res.redirect('/home')
        } 
        res.clearCookie(SESS_NAME)
        res.redirect('/')
        
    })
 }) 

 app.get('/update/:id',(req, res) => {   
     const id = req.params.id
     users.find({_id: id}).lean().exec((err, user)=>{
         if(user){
             res.render("update",{doc:user})
         }
     })
   
     })    
app.post('/upload/:id',(req,res) => {
     const id = req.params.id
    
    const {username,password,phone,email,pin} = req.body;
    const data = {
        username,
        password,
        phone,
        email,
        pin
    }
    users.findByIdAndUpdate(id,data,(err,res)=>{ 
       
        if(err){
            console.log(err);
            
        }
        console.log(res);
    })
     
   
    res.redirect('/welcome')
}) 



 app.get('/delete/:id',(req, res) => {    
   users.findByIdAndRemove(req.params.id,(err,doc) => {  
       if (!err) {
    res.redirect('/welcome')
} else {
    res.redirect('/welcome')
}})
      
    }); 






const PORT = process.env.PORT || 3030

app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`));