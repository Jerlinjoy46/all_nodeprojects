const express =  require('express');
const app = express();
const router = express.Router()
const path = require('path');
const Members = require('./Members')



router.get('/api/members', (req,res) => res.json(members));


router.get('/api/mebers/:id', (req,res) => {
    const found = members.some(members => members.id === parseInt(req.params.id));
     if(found) {
         res.json(members.filter(members => members.id === parseInt(req.params.id)));
     } else {
         res.status(400).json({ msg : `no match.....! at ${(req.params.id)}`})
     }

});
module.exports = router;