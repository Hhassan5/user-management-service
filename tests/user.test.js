const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const config = require('../src/config/config');

beforeAll(async () => {
  await mongoose.connect(config.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User API', () => {
  let token;
  const userData = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123',
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send(userData);
    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe(userData.email);
  });

  it('should login and return a token', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: userData.email, password: userData.password });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('should get user profile', async () => {
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.profile.email).toBe(userData.email);
  });
});