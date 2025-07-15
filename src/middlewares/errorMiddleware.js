/**
 * Global Error Handling Middleware
 * 
 * Express error handling middleware that catches and processes all errors.
 * Provides consistent error responses and logging throughout the application.
 * Must be placed after all other middleware and routes.
 * 
 * @param {Error} err - Error object thrown by previous middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports = (err, req, res, next) => {
  // Log error details for debugging (in production, use proper logging library)
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
  
  // Send error response to client
  // Note: In production, you may want to differentiate between error types
  // and provide different status codes (400, 401, 403, 404, 500, etc.)
  res.status(400).json({ 
    error: err.message || 'An error occurred' 
  });
};
