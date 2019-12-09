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
    model.photo.findAll({})
    .then(function(photos){
        console.log(photos)
        res.render('image',{photos})
    })
})

router.get('/images/add',(req,res)=>{
    model.photo.findAll({})
    .then(function(photos){
        console.log(photos)
        res.render('image_form',{photos})
    })
})

router.post('/images/add',(req,res)=>{
    const {title,description}=req.body

    cloudinary.v2.uploader.upload(req.file.path)
    .then(function(result){
        model.photo.create({
            title: title,
            description: description,
            imageUrl: result.url,
            public_id: result.public_id
        })
    })
    .then(function(){ 
        fs.unlink(req.file.path)
    })
    .then(function(){
        res.send(200,{message:'La fotose ha salvado exitosamente'})
    })
    .catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;