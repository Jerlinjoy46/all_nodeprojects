const express= require("express");
const path = require('path');
const mongoose = require("mongoose");
//handlebar 
const exphbs  = require('express-handlebars');
const app = express();
const bcrypt = require('bcrypt');
// const alert = require('alert-node')
// app.use(express.path.join(__dirname, 'views'));
mongoose.connect("mongodb://localhost/auth_demo");

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
        //   httpOnly: true,

        
    }
})) 

app.get('/',(req,res) => res.render('home'));

app.get('/welcome',(req,res,next) => {
    users.find({}).lean().exec((err,data) => {
        res.render('index2.handlebars',{users:data})
    })
      
})
const unameDB ="Admin"
const pswDB ="admin@123"
app.post("/login",(req,res) => {
    const { uname,psw } = req.body;
    if(uname === unameDB && psw === pswDB){ 
       req.session.user=uname;
    res.redirect('/welcome') 
    } else{
        // alert("LOGIN ERROR")
        res.redirect('/')  
    } 
});  


// app.get('/index2',(res,req) => {
 
// })

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
    
    const {username,phone,city} = req.body;
    const data = {
        username,
        phone,
        city
    }
//  data.password = bcrypt.hashSync(req.body.password)
    users.findByIdAndUpdate(id,data,(err,res)=>{ 
        // var password = Bcrypt.hashSync(request.body.password, 10)
        // var password = bcrypt.hashSync(req.body.password, 10)
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
      
    })    




const PORT = process.env.PORT || 3030

app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`));