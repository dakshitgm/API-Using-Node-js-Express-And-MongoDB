const express=require('express');

const app=express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use('/api/stuff', (req, res, next)=>{
    const stuff=[
        {
            _id: '10',
            title: 'first one',
            description: 'no description',
            imageUrl: '',
            price: 5000,
            userId: '2g34'
        },
        {
            _id: '103',
            title: 'second',
            description: 'no descbhkwad',
            imageUrl: '',
            price: 5040,
            userId: '3fg4'
        },
        {
            _id: '104',
            title: 'third',
            description: 'no descbhkwad',
            imageUrl: '',
            price: 50403,
            userId: '3fg4'
        }
    ];
    res.json(stuff);
});
module.exports=app;