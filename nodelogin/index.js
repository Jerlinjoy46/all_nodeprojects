const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('view')); 
const unameDB ="jerlin";
const pswDB ="123"

app.post("/login",(req,res) => {
const { uname,psw } = req.body;
if(uname === unameDB && psw === pswDB){
    res.send("login Successful");
} else {
    res.send("login failed");
}
});
const PORT = process.env.PORT || 3001; 

app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`));