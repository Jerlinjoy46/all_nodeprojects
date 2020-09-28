const express= require("express");
const path = require('path');
//handlebar 
const exphbs  = require('express-handlebars');
const app = express();

// app.use(express.path.join(__dirname, 'views'));

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.get('/',(req,res) => res.render('home'));





const PORT = process.env.PORT || 30000

app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`));