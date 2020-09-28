const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('view')); 
const uname ="jerlin";
const pwd ="123"

app.post("/login",(req,res) => {

})
const PORT = process.env.PORT || 5000; 

app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`));