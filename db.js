const mongoose = require('mongoose');
require("dotenv").config();

const connectDb = () =>{
    try {
        const dbPort = process.env.DB_URI;
        
        mongoose.connect(dbPort, { dbName: 'airbnb' });
        console.log(`MongoDB Connected Successfully`);
    }catch (e) {
        console.log(`MongoDB Connection Error: ${e}`);
    }
};


module.exports = connectDb;