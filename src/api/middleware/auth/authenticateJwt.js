import jwt from 'jsonwebtoken';

const authenticateJwt = (req, res, next) => {
    const token = req.cookies.auth_token;

    if(!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the decoded user information to the request object
        req.user = decoded;
        next();
    } catch (error) {
        console.log("JWT verification failed:", error);
        return res.status(401).json({
            message: "Invalid or expired token",
            error: error.message
        })
    }
}