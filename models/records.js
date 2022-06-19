const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
    farm_num:{
        type: String
    },
    plant:{
        type: String
        
    },
    activity:{
        type: String
    },
    date:{
        type:String
    }
})
module.exports = mongoose.model('recordModel', recordSchema);