import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    const {token} = req.cookies;
    // const {token} = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized! Login again' });
    }
    
    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecoded.id) {
            req.body.userId = tokenDecoded.id; // Store user ID in request body
        }else{
            return res.status(401).json({ success: false, message: 'Unauthorized! Invalid token' });
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(403).json({ success: false, message: 'Forbidden' });
    }
}

export default userAuth;