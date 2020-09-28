const express = require('express');
const session = require('express-session');
const  TWO_HOURS = 1000 * 60 * 60 * 2
const NODE_ENV = 'development'
const SESS_LIFETIME = TWO_HOURS
const IN_PROD = NODE_ENV === 'production'
SESS_NAME = 'sid'
SESS_SECRET = 'ssh!quiet,it\'asecret!';
const app = express();  
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}))
const users = [
    {id:1,name:'jer',Email:'jer@gamil.com',password:'123'},
    {id:2,name:'jerlin',Email:'jer@gamil.com',password:'jer'},
    {id:3,name:'jerl',Email:'jer@gamil.com',password:'je'}
]
app.use(session({
    name: SESS_NAME,
    resave:false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie:{
        maxAge: SESS_LIFETIME,
        sameSite: true,   
      secure: IN_PROD,  
      

    }
}))
const redirectlogin = (res,req,next) => {
    if(req.session.userId){ 
        res.redirect('/login')
    }else {
        next() 
    }
}
const redirecthome = (res,req,next) => {
    if(req.session.userId){
        res.redirect('/home')
    }else {
        next() 
    }
}
 app.get('/',(req,res) => { 
    const { userId } = req.session
res.send(`
<h1>welcome!</h1>
${userId ? `<a href='/home'>HOME</a>
<form method='post' action='/logout'>
<button>logout</button>
</form>` : `<a href='/login'>LOGIN</a>
<a href='/register'>REGISTER</a> `}
`)
}) 
app.get('/home',redirectlogin,(req,res) => {
    const user = users.finds(user => user.id === req.session.userId)
    res.send(`<html>
    <h1>Home</h1>
    <a href='/'>Welcome</a>
    <ul>
    <li>Name:${user.name} </li>
    <li>Email:${user.email} </li>
    </ul>
    </html>`)
    })
app.get('/login',redirecthome,(req,res) => {
    res.send(`<html>
        <h1>LOGIN</h1>
        <form method='post' action='/login' >
        <input type='email' name='email' require>
        <input type='password' name='password' require> 
        <input type='submit' value='login'>
        </form>
        <a href='/register'>Register</a>`)
    })
app.get('/register',(req,res) => {
    res.send(`<html>
    <h1>REGISTER</h1>
    <form method='post' action='/register' >
    <input type='text' name='uname' require placeholder='NAME'>
    <input type='email' name='email' require placeholder='EMAIL'>
    <input type='password' name='password' require placeholder='PASSWORD'>  
    <input type='submit' value='submit'>
    </form>
    <a href='/login'>Login</a>
    </html>`)
}) 
app.post('/login',redirecthome,(req,res) => {
    const { email,password } = req.body 
    if (email, password){
        const user = users.find(
            user => user.email === email && user.password === password
        ) 
        if(user){
            req.session.userId = user.id
            return res.redirect('/home')
        }
    }
    res.redirect('/login')
}) 
app.post('/register',redirecthome,(req,res) => {
    const { email,password } = req.body  
    if (name && email && password){
        const exists = users.some(
            user => user.email === email
        ) 
        if (!exists){
            const user = {
                id:users.length +1,
            name,
        email,
    password            }
        } 
        users.push(user)
        req.session.userId = user.id
        return res.redirect('/home')
    } 
 res.redirect('/register')
}) 
 app.post('/logout',redirectlogin,(req,res) => {
    req.session.destroy(err => {
        if(err) {
            return res.redirect('/home')
        } 
        res.clearCookie(SESS_NAME)
        res.redirect('/login')
    })
 }) 
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`server is runing on ${PORT} port....!`))