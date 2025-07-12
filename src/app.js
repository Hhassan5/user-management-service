const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const config = require('./config/config');
const userRoutes = require('./api/routes/userRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

// Connect to MongoDB
connectDB(config.MONGODB_URI);

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);

// Error handler
app.use(errorMiddleware);

module.exports = app;