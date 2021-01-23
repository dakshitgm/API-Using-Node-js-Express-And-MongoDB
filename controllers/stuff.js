const Thing = require('../models/thing');

exports.createOneThing=(req, res, next) => {
    const thing = Thing({
        title:req.body.title,
        description:req.body.description,
        imageUrl:req.body.imageUrl,
        price:req.body.price,
        userId:req.body.userId
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
};

exports.deleteOne=(req, res, next) => {
    Thing.deleteOne({
        _id:req.params.id
    }).then( () => {
        res.status(200).json({message:"deleted succsessfully"});
    }).catch( error => {
        res.status(400).json({error:error});
    });
};

exports.getAll=(req, res, next)=>{
    Thing.find().then( things =>{
        res.status(200).json(things);
    }).catch( error =>{
        res.status(400).json({error:error});
    });
}