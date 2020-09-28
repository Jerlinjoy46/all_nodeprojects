const express = require("express"); 
//handlebar 
const exphbs  = require('express-handlebars');
const app = express();
const path = require("path"); 
const logger = require("./middlever/logger"); 
const members=require('./members');  
 
//Set stactic folder 
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//handle render 
app.get('/',(req,res) => res.render('index',{
    title: 'member app',
    members
}));
app.use(express.static(path.join(__dirname,'public'))); 
app.use(express.static(path.join(__dirname,'./API/router'))); 
app.use('/api/members',require('./API/router/members'));
//handle bars middlewaer
// app.engine('handlebars',exphbs({defaultLayout: 'main'}));
// app.set('view engine','handlebars'); 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars')
//body parser MIddleware
// app.get('/', (req,res) =>{
// res.sendFile(path.join(__dirname,'public'));
// });
// app.get("/",(req,res) => {
//     res.sendFile(path.join(__dirname,'public'));
// });
// app.get("*",(req,res) => { 
//     res.sendFile(path.join(__dirname,'public','404.html'));
// }); 


//set dynamic folder 
// const members = [ {
//     id:1,
//     name:'jerlin',
//     email:'jerlin@gmail.com',
//     status:'active'
// },
// {
//     id:2,
//     name:'tishil',
//     email:'tishiljoppzzSomkie@gmail.com',
//     status:'active'
// },
// {
//     id:3,
//     name:'jerin',
//     email:'jerinpopzzRockzz@gmail.com',
//     status:'inactive'  
// }]
// const members=require('./members'); 


// app.use(logger);
// app.get('/api/members',(req,res) => {
//      res.json(members);   
// });
// // set single member
// app.get('/api/members/:id',(req,res) => { 
//     const found = members.some(members => members.id === parseInt(req.params.id)); 
//     if(found){
//    res.json(members.filter(members => members.id === parseInt(req.params.id)));
//     }else{
//         res.status(400).json({ msg: `no match........!${req.params.id}`});
//     }
// });

const PORT = process.env.PORT || 3003


app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`));