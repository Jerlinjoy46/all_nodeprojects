const express =  require('express');
const app = express();
const path = require('path');
// const Members = require('./Members')
//  app.use(express.static(path.join(__dirname,'')));
 app.get('/',(req,res) => {
     res.sendFile(path.join(__dirname,'public','index.js'))
 }); 

 const PORT = process.env.PORT || 5000;

 app.listen(PORT, () => console.log(`Server is running on ...... ${PORT}`));