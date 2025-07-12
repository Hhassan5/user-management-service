const mongoose = require('mongoose');

/**
 * Initializes MongoDB connection using Mongoose.
 * @param {string} mongoUri - MongoDB connection string
 */
const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;