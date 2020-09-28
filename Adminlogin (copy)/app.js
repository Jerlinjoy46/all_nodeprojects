const express               =  require('express'),
      app                   =  express(),
      mongoose              =  require("mongoose"),
      passport              =  require("passport"),
      bodyParser            =  require("body-parser"),
      LocalStrategy         =  require("passport-local"),
      passportLocalMongoose =  require("passport-local-mongoose"),
      users             =  require("./models/user");
      exphbs  = require('express-handlebars');


      //Connecting database
mongoose.connect("mongodb://localhost/auth_demo"); 

app.use(require("express-session")({
    secret:"Any normal Word",       //decode or encode session
    resave: false,          
    saveUninitialized:false    
}));


passport.serializeUser(users.serializeUser());       //session encoding
passport.deserializeUser(users.deserializeUser());   //session decoding
passport.use(new LocalStrategy(users.authenticate()));


app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('views')); 


app.use(bodyParser.urlencoded(
    { extended:true }
))
app.use(passport.initialize());
app.use(passport.session());



app.get("/", (req,res) =>{
    res.render("adminlogin");
})

app.use(express.static('view'));


const unameDB = "Admin";
const pswDB = "Admin@123"


app.get('/adminprofile',(req,res) => {
    res.render('adminprofile.handlebars')
})
app.post("/adminlogin",(req,res) =>{
    const {username , password} = req.body;
    if(username === unameDB && password === pswDB){
        res.redirect("/adminprofile")
    } else {
        res.redirect('/')
    }
}) 

// app.get("/adminprofiles",(req,res) => {
//     users.find((err,docs) => {
//         if(!err){
//             res.render("/adminprofiles",{
//                 adminprofiles: docs
//             });
//         } else {
//             console.log('Error is retriving users :' + err);
//         }

//     });
// });



app.get("/adminlogout",(req,res)=>{
    req.logout();
    res.redirect("/");
});


// function isLoggedIn(req,res,next) {
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/adminlogin");
// }



app.listen(process.env.PORT ||3003,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("Server Started At Port 3003");
    }
      
});
