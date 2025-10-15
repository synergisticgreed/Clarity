import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const signup= async (req, res) => {
  try {
    const { username, password } = req.body;

    // ✅ Check for missing fields
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists.' });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Save user
    const user = new User({ username, password: hashedPassword });
    await user.save();

    // ✅ Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ Send success response
    res.status(201).json({
      message: 'User registered successfully.',
      token,
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again later.' });
  }
}


export const login=  async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Create token with fallback values
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'fallback-secret-key', 
      { expiresIn: "1h" }  // ← Safe now!
    );

    res.status(200).json({ 
      success: true,
      message: 'Login successful',
      token: token 
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
}

 export const getProfile=async (req, res) => {
  try {
    console.log('Looking for user with ID:', req.userId); // 👈 Debug log
    
    // Find user by ID (excluding password)
    const user = await User.findById(req.userId).select('-password');
    
    // Check if user exists
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }
    
    // Return user data
    res.json({
      success: true,
      user: user
    });
    
  } catch (err) {
    console.error('Profile error:', err); // 👈 Debug log
    res.status(500).json({ 
      error: 'Server error',
      message: err.message 
    });
  }
}