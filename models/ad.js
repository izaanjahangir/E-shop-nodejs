const mongoose = require('mongoose');
const schema = mongoose.Schema({
    category:{
        type:String
    },
    name:{
        type: String
    },
    images:{
        type: Array,
    },
    description:{
        type: String
    },
    price:{
        type: Number
    },
    owner:{
        type:String
    },
    ownerId:{
        type: String
    },
    location:{
        type:String
    }
});

const model = mongoose.model('Ad',schema);
module.exports = model;