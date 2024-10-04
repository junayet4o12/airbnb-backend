const mongoose = require('mongoose');
require("dotenv").config();
const uri = process.env.DB_URI;
const connectDb = async () => {
    console.log('connecting');
    
    await mongoose.connect(uri, { dbName: 'airbnb' })
    console.log('connected')
}
module.exports = connectDb;



