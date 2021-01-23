const express = require('express');
const parser = require('body-parser');
const mongo = require("mongoose");

const stuffRoutes=require('./routes/stuff');
const userRoutes=require('./routes/user');

const app=express();

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

app.use('/api/stuff',stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports=app;