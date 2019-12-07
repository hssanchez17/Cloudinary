const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('image')
})

router.get('/images/add',(req,res)=>{
    res.render('image_form')
})

router.post('/images/add',(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    res.send('recibido')
})
module.exports = router;