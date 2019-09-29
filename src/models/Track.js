const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    timestamp: Number,
    coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number, 
        speed: Number
    }
})

const trackSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        //a reference to some other object stored in mgdb
        ref:'User'
        //ref property of user is used specifically by Mongoose,
        // tells that this user id is pointing at an instance of a user as was defined inside the User.js file 
        // to be more specific it points to the model right this mongoose.model('User', userSchema); in User.js file

    },
    name: {
        type: String,
        default: ''
    },
    locations: [pointSchema]
    // this separate schema obj is going to describe the different objs that are going to be inside of this array 
})

mongoose.model('Track',trackSchema );