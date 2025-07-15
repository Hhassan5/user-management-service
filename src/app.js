const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const config = require('./config/config');
const userRoutes = require('./api/routes/userRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

/**
 * Express Application Setup
 * 
 * Configures the Express application with all necessary middleware,
 * routes, and error handling. This module sets up the complete
 * application stack but doesn't start the server.
 */

// Create Express application instance
const app = express();

// ===== DATABASE CONNECTION =====
// Initialize MongoDB connection
connectDB(config.MONGODB_URI);

// ===== MIDDLEWARE SETUP =====

// Body parser middleware - parses JSON request bodies
app.use(express.json());

// HTTP request logger middleware (logs all incoming requests)
app.use(morgan('dev'));

// ===== ROUTES SETUP =====

// Mount user routes at /api/users
// All routes in userRoutes will be prefixed with /api/users
app.use('/api/users', userRoutes);

// ===== ERROR HANDLING =====

// Global error handler middleware (must be last)
// Catches all errors thrown by previous middleware and routes
app.use(errorMiddleware);

// Export configured application
module.exports = app;
