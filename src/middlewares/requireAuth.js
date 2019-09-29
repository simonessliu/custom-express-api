const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const User = mongoose.model('User');

module.exports = (req,res,next) =>{
    const {authorization} = req.headers;// postman header case insensitive
    // authorization === 'Bear alsdfasdfasdf'
    if(!authorization) {
        return res.status(401).send({error:'You must log in'});
    }

    const token = authorization.replace('Bearer ', '');
    // this will leave us the token just right there like alsdfasdfasdf
    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        if(err){
            return res.status(401).send({error:'You must log in'})
        }

        const {userId} = payload;

        const user = await User.findById(userId);
        req.user = user;
        next(); // this middle ware is done;
    })
};