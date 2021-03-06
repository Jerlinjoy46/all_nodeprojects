const express= require("express");
const path = require('path');
//handlebar 
const exphbs  = require('express-handlebars');
const app = express();
const alert = require('alert-node')
// app.use(express.path.join(__dirname, 'views'));
const cookieParser = require('cookie-parser')
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.get('/',(req,res) => res.render('home'));
app.use(express.static('view')); 
const session = require('express-session');
const  TWO_HOURS = 1000 * 60 * 60 * 2
const NODE_ENV = 'development'
const SESS_LIFETIME = TWO_HOURS
const IN_PROD = NODE_ENV === 'production'
SESS_NAME = 'sid'
SESS_SECRET = 'ssh!quiet,it\'asecret!';
app.use(cookieParser())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(session({
    name: SESS_NAME,
    resave:false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie:{
        maxAge: SESS_LIFETIME,
        sameSite: true,   
      secure: IN_PROD,   
    //   httpOnly: true  

    }
})) 

app.get('/welcome',(req,res,next) => {
    res.render('index2.handlebars')    
})
const unameDB ="jerlin"
const pswDB ="123"
app.post("/login",(req,res) => {
    const { uname,psw } = req.body;
    if(uname === unameDB && psw === pswDB){ 
       
    res.redirect('/welcome') 
    } else{
        alert("LOGIN ERROR")
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


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`));