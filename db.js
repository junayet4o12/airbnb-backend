const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DB_URI;

let isConnected = false; // Keep track of the connection status

const connectDb = async () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  try {
    console.log('=> connecting to database');

    await mongoose.connect(uri, {
      dbName: 'airbnb',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s if unable to connect
    });

    isConnected = mongoose.connection.readyState === 1; // Set the status to connected
    console.log('=> connected to database');
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw new Error('Database connection failed'); // Throw error to handle it in the calling function
  }
};

module.exports = connectDb;
