const express = require('express');
const router = express.Router();
const cloudinary=require('cloudinary')
const model=require('./models');
const  fs=require('fs-extra')

cloudinary.config({
    cloud_name:'dtk23qqtz',
    api_key:'183911597881782',
    api_secret:'qDv2EmI--_ZrmQEphk8wF1FLEyg'    
})

router.get('/',(req,res)=>{
    res.render('image')
})

router.get('/images/add',(req,res)=>{
    res.render('image_form')
})

router.post('/images/add',(req,res)=>{
    //console.log('epale')


    
    const {title,description}=req.body
   // console.log(req.file.path)
    cloudinary.v2.uploader.upload(req.file.path)
    .then(function(result){
        model.photo.create({
            title: title,
            description: description,
            imageUrl: result.url,
            public_id: result.public_id
        })
        .then(function(){ 
            fs.unlink(req.file.path)
            .then(function(){
                res.send(200,{message:'La fotose ha salvado exitosamente'})
            })
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;