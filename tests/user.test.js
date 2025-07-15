const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const config = require('../src/config/config');

/**
 * User API Integration Tests
 * 
 * Tests the complete user authentication flow:
 * 1. User registration
 * 2. User login
 * 3. Profile retrieval
 * 
 * Uses Jest testing framework and Supertest for HTTP testing.
 */

// ===== TEST SETUP =====

/**
 * Setup database connection before running tests
 */
beforeAll(async () => {
  await mongoose.connect(config.MONGODB_URI);
});

/**
 * Cleanup database connection after all tests complete
 */
afterAll(async () => {
  await mongoose.connection.close();
});

// ===== TEST SUITE =====

describe('User API', () => {
  // Store JWT token between tests
  let token;
  
  // Test user data
  const userData = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123',
  };

  /**
   * Test user registration endpoint
   * 
   * Verifies that:
   * - Registration returns 201 status
   * - Response contains user data
   * - Password is not included in response
   */
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send(userData);
      
    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe(userData.email);
    expect(res.body.user.password).toBeUndefined(); // Password should not be in response
  });

  /**
   * Test user login endpoint
   * 
   * Verifies that:
   * - Login returns 200 status
   * - Response contains JWT token
   * - Response contains user data
   */
  it('should login and return a token', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: userData.email, password: userData.password });
      
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(typeof res.body.token).toBe('string');
    
    // Store token for subsequent tests
    token = res.body.token;
  });

  /**
   * Test user profile endpoint
   * 
   * Verifies that:
   * - Profile request returns 200 status
   * - Response contains user profile data
   * - JWT authentication works correctly
   */
  it('should get user profile', async () => {
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);
      
    expect(res.statusCode).toBe(200);
    expect(res.body.profile.email).toBe(userData.email);
    expect(res.body.profile.password).toBeUndefined(); // Password should not be in response
  });
});
