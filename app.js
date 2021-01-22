

const express = require('express');
const parser = require('body-parser');
const mongo = require("mongoose");
const Thing = require('./models/thing');
const { json } = require('express');

const app=express()

mongo.connect(***REMOVED***)
    .then(() => {
        console.log("connected to mongo db");
    }).catch(error => {
        console.log('promblem while connecting');
        console.error(error);
    });
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(parser.json());
app.post('/api/stuff', (req, res, next) => {
   const thing = Thing({
       title:req.body.title,
       description:req.body.description,
       imageUrl:req.body.imageUrl,
       price:req.body.price,
       userId:req.body.userId
   });

   thing.save().then( () => {
        res.status(201).json({
            message:"databse saved succsessfully"
        });
   }).catch( error => {
        res.status(400).json({
            message:error
        });
   });

});

app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({
        _id:req.params.id
    }).then( things => {
        res.status(200).json(things);
    }).catch(error => {
        json.status(400).json({error:error});
    });
});

app.put('/api/stuff/:id', (req, res, next) => {
    const thing=new Thing({
        _id:req.params.id,
        title:req.body.title,
        description:req.body.description,
        imageUrl:req.body.imageUrl,
        price:req.body.price,
        userId:req.body.userId
    });

    Thing.updateOne({
        _id:req.params.id
    }, thing).then(() => {
        res.status(201).json({message:'sucsessfully updated thing'});
    }).catch( error => {
        res.status(400).json({error:error});
    });
});

app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({
        _id:req.params.id
    }).then( () => {
        res.status(200).json({message:"deleted succsessfully"});
    }).catch( error => {
        res.status(400).json({error:error});
    });
});

app.use('/api/stuff', (req, res, next)=>{
    Thing.find().then( things =>{
        res.status(200).json(things);
    }).catch( error =>{
        res.status(400).json({error:error});
    });
});
module.exports=app;