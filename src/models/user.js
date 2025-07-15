const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema Definition
 * 
 * Defines the structure and validation rules for user documents in MongoDB.
 * Includes password hashing middleware and comparison methods.
 */
const userSchema = new mongoose.Schema({
  // Username field - unique identifier for user login
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,           // Ensures no duplicate usernames
    trim: true,             // Removes whitespace from both ends
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
  },
  
  // Email field - primary identifier for authentication
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,           // Ensures no duplicate emails
    lowercase: true,        // Convert to lowercase before saving
    trim: true,             // Remove whitespace
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  
  // Password field - will be hashed before storage
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    // Note: Password will be hashed by pre-save middleware
  },
  
  // Role field - defines user permissions
  role: {
    type: String,
    enum: {
      values: ['student', 'instructor', 'admin'],
      message: 'Role must be either student, instructor, or admin'
    },
    default: 'student',     // Default role for new users
  },
  
  // Timestamp for user creation
  createdAt: {
    type: Date,
    default: Date.now,      // Automatically set to current date/time
  },
});

/**
 * Pre-save Middleware - Password Hashing
 * 
 * Automatically hashes the password before saving to database.
 * Only hashes if password is new or modified to avoid double-hashing.
 */
userSchema.pre('save', async function (next) {
  // Skip hashing if password hasn't been modified
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    // Generate salt with complexity factor of 10
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password with the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    
    // Continue with save operation
    next();
  } catch (err) {
    // Pass error to next middleware/handler
    next(err);
  }
});

/**
 * Instance Method - Password Comparison
 * 
 * Compares a plain text password with the hashed password stored in database.
 * Used during login authentication.
 * 
 * @param {string} candidatePassword - Plain text password to verify
 * @returns {Promise<boolean>} - True if passwords match, false otherwise
 */
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the User model
module.exports = mongoose.model('User', userSchema);
