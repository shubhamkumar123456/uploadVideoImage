const mongoose = require('mongoose');
require('dotenv').config()
const connectToDb = async()=>{
    await mongoose.connect('mongodb://0.0.0.0:27017/uploadProject')
    .then(()=>console.log('connected to database successfully'))
    .catch(()=>console.log('error in mongodb connection'))
}

module.exports = connectToDb;