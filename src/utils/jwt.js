import jwt from 'jsonwebtoken';

export const generateJwtToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '5d', // Token will expire in 5 days
    });
}

export const verifyJwtToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null; // Return null if verification fails
    }
}