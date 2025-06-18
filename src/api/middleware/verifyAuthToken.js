import admin from "../../config/firebase.js";

const verifyToken = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {

        return res.status(401).json({ 
            message: 'Unauthorized: No token provided'
        });
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
}

export default verifyToken;