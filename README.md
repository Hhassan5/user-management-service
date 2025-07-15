# User Service API

A Node.js REST API for user management with authentication using JWT tokens.

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Input validation with Joi
- MongoDB integration with Mongoose
- Dockerized deployment

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Register new user | No |
| POST | `/api/users/login` | Login user | No |
| GET | `/api/users/profile` | Get user profile | Yes |

## Getting Started

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and configure
3. Start with Docker: `docker-compose up -d`
4. Run tests: `npm test`

## Environment Variables

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
