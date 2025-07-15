const Joi = require('joi');

/**
 * User Validation Schemas
 * 
 * Defines validation rules for user-related API endpoints using Joi.
 * Ensures data integrity and provides clear error messages for invalid input.
 */

/**
 * Registration Validation Schema
 * 
 * Validates user registration data including:
 * - Username: alphanumeric, 3-30 characters
 * - Email: valid email format
 * - Password: minimum 8 characters
 * - Role: optional, must be valid role type
 */
const registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()                    // Only alphanumeric characters
    .min(3)                        // Minimum 3 characters
    .max(30)                       // Maximum 30 characters
    .required()                    // Required field
    .messages({
      'string.alphanum': 'Username must contain only letters and numbers',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username cannot exceed 30 characters',
      'any.required': 'Username is required'
    }),
    
  email: Joi.string()
    .email()                       // Valid email format
    .required()                    // Required field
    .messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required'
    }),
    
  password: Joi.string()
    .min(8)                        // Minimum 8 characters for security
    .required()                    // Required field
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'any.required': 'Password is required'
    }),
    
  role: Joi.string()
    .valid('student', 'instructor', 'admin')  // Must be one of these values
    .optional()                    // Optional field (defaults to 'student')
    .messages({
      'any.only': 'Role must be either student, instructor, or admin'
    }),
});

/**
 * Login Validation Schema
 * 
 * Validates user login credentials:
 * - Email: valid email format
 * - Password: minimum 8 characters
 */
const loginSchema = Joi.object({
  email: Joi.string()
    .email()                       // Valid email format
    .required()                    // Required field
    .messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required'
    }),
    
  password: Joi.string()
    .min(8)                        // Minimum 8 characters
    .required()                    // Required field
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'any.required': 'Password is required'
    }),
});

module.exports = { registerSchema, loginSchema };
