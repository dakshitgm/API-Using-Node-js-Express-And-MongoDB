const Thing = require('../models/thing');
const fs = require('fs');

exports.createOneThing=(req, res, next) => {
    const url=req.protocol + '://' + req.get('host');
    req.body.thing=JSON.parse(req.body.thing);
    const thing = Thing({
        title:req.body.thing.title,
        description:req.body.thing.description,
        imageUrl:url + '/images/' + req.file.filename,
        price:req.body.thing.price,
        userId:req.body.thing.userId
    });
    console.log(thing);
    thing.save().then( () => {
         res.status(201).json({
             message:"databse saved succsessfully"
         });
    }).catch( error => {
         res.status(400).json({
             error:error
         });
    });
 
 };

 exports.getOneThing=(req, res, next) => {
    Thing.findOne({
        _id:req.params.id
    }).then( things => {
        res.status(200).json(things);
    }).catch(error => {
        json.status(400).json({error:error});
    });
};

exports.modifyOne= (req, res, next) => {
    let thing=new Thing({_id:req.params._id});
    if(req.file){
        const url=req.protocol + '://' + req.get('host');
        req.body.thing=JSON.parse(req.body.thing);
        thing = {
            _id:req.params.id,
            title:req.body.thing.title,
            description:req.body.thing.description,
            imageUrl:url + '/images/' + req.file.filename,
            price:req.body.thing.price,
            userId:req.body.thing.userId
        };
    }else {
        thing={
            _id:req.params.id,
            title:req.body.title,
            description:req.body.description,
            imageUrl:req.body.imageUrl,
            price:req.body.price,
            userId:req.body.userId
        };
    }

    Thing.updateOne({
        _id:req.params.id
    }, thing).then(() => {
        res.status(201).json({message:'sucsessfully updated thing'});
    }).catch( error => {
        res.status(400).json({error:error});
    });
};

exports.deleteOne=(req, res, next) => {
    Thing.findOne({
        _id:req.params.id
    }).then( thing => {
        const filename=thing.imageUrl.split('/images/')[1];
        fs.unlink('images/' + filename, () => {
            Thing.deleteOne({
                _id:req.params.id
            }).then( () => {
                res.status(200).json({message:"deleted succsessfully"});
            }).catch( error => {
                res.status(400).json({error:error});
            });
        });
    })
   
};

exports.getAll=(req, res, next)=>{
    Thing.find().then( things =>{
        res.status(200).json(things);
    }).catch( error =>{
        res.status(400).json({error:error});
    });
}