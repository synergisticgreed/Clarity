import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  try {
    // 1️⃣ Get token from Authorization header
    const authHeader = req.header('Authorization');
    
    // Check if token exists
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'Access denied. No token provided.' 
      });
    }

    // 2️⃣ Extract token (remove "Bearer " prefix if present)
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7)  // Remove "Bearer " (7 characters)
      : authHeader;

    // 3️⃣ Verify token with your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // 4️⃣ Attach userId to request object
    req.userId = decoded.userId;
    
    // 5️⃣ Continue to next middleware/route
    next();
    
  } catch (error) {
    // Handle different types of errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token has expired. Please login again.' 
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Invalid token. Please login again.' 
      });
    }
    
    // Generic error
    return res.status(401).json({ 
      error: 'Authentication failed.' 
    });
  }
};

export default verifyToken;