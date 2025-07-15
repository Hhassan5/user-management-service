const mongoose = require('mongoose');

/**
 * Database Connection Configuration
 * 
 * Establishes a connection to MongoDB using Mongoose ODM.
 * Handles connection errors gracefully and provides clear logging.
 * 
 * @param {string} mongoUri - MongoDB connection string (e.g., 'mongodb://localhost:27017/mydb')
 * @returns {Promise<void>} - Resolves when connected, exits process on failure
 */
const connectDB = async (mongoUri) => {
  try {
    // Connect to MongoDB with recommended options
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,    // Use new URL parser (handles connection strings better)
      useUnifiedTopology: true, // Use new Server Discover and Monitoring engine
    });
    
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    // Log detailed error information
    console.error('❌ MongoDB connection error:', error.message);
    
    // Exit the process with failure code (1) to prevent app from running without DB
    process.exit(1);
  }
};

module.exports = connectDB;
