import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized! Please log in.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Store the userId in request object (body is not ideal for auth context)
        req.userId = decoded.id;

        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
};

export default userAuth;




// NewStrongPassword123