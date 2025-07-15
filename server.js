const app = require('./src/app');
const config = require('./src/config/config');

/**
 * Server Entry Point
 * 
 * Starts the HTTP server using the configured Express application.
 * This is the main entry point for the application.
 */

// Start the server and listen on configured port
app.listen(config.PORT, () => {
  console.log(`🚀 User service running on port ${config.PORT}`);
  console.log(`📍 Server URL: http://localhost:${config.PORT}`);
  console.log(`📖 API Documentation: http://localhost:${config.PORT}/api/users`);
});
