import express from 'express';

import verifyToken from '../middlewares/auth.middleware.js';
import dotenv from 'dotenv';
import { getProfile, login, signup } from '../controllers/auth.controller.js';
dotenv.config();

const router = express.Router();

// User registration
router.post('/signup',signup);


// User login
router.post('/login',login);


// Protected route
router.get('/profile', verifyToken,getProfile);

// Logout route
router.post('/logout', (req, res) => {
  // For stateless JWT, logout is handled on the client by deleting the token
  res.status(200).json({ message: 'Logged out successfully. Delete your token on client side.' });
});

export default router;