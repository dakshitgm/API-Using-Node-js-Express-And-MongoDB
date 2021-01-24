const express = require('express');
const router = express.Router();

const stuffCtrl =require('../controllers/stuff.js');
const auth = require('../middleware/auth');
const multer = require('../middleware/configure-multer')

router.post('/', auth, multer, stuffCtrl.createOneThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, multer, stuffCtrl.modifyOne);
router.delete('/:id', auth, stuffCtrl.deleteOne);
router.get('/', auth, stuffCtrl.getAll);

module.exports=router;


/*for test



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
app.post('/api/products', (req, res, next) => {
   const thing = Thing({
       name:req.body.name,
       description:req.body.description,
       price:req.body.price,
       inStock:req.body.inStock
   });

   thing.save().then( product => {
        res.status(201).json({product: product});
   }).catch( error => {
        res.status(400).json({
            message:error
        });
   });

});

app.get('/api/products/:id', (req, res, next) => {
    Thing.findOne({
        _id:req.params.id
    }).then( things => {
        res.status(200).json({product:things});
    }).catch(error => {
        json.status(400).json({error:error});
    });
});

app.put('/api/products/:id', (req, res, next) => {
    const thing=new Thing({
        _id:req.params.id,
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        inStock:req.body.inStock
    });

    Thing.updateOne({
        _id:req.params.id
    }, thing).then(() => {
        res.status(201).json({message:'Modified!'});
    }).catch( error => {
        res.status(400).json({error:error});
    });
});

app.delete('/api/products/:id', (req, res, next) => {
    Thing.deleteOne({
        _id:req.params.id
    }).then( () => {
        res.status(200).json({message:"deleted succsessfully"});
    }).catch( error => {
        res.status(400).json({error:error});
    });
});

app.use('/api/products', (req, res, next)=>{
    Thing.find().then( things =>{
        res.status(200).json({products: things});
    }).catch( error =>{
        res.status(400).json({error:error});
    });
});
module.exports=app;

*/