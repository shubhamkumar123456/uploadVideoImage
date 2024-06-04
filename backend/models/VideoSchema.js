const mongoose = require('mongoose');
const videoSchema = new mongoose.Schema({
    video:{
        type:String,
    }
});
module.exports = mongoose.model('videos',videoSchema)
