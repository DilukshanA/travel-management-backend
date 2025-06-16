import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { User } from './models/user.js';
import verifyToken from './middleware/authMiddleware.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT;

await connectDB();

app.get('/', (req, res) => {
    res.send(`Server is running on http://localhost:${PORT}`);
})

app.post('/api/auth/signup', verifyToken, async (req, res) => {
    try {
        const { uid, firstName, lastName, email, role } = req.body;

        const checkUserExists = await User.findOne( { uid } );
        if (!checkUserExists) {
            const newUser = new User({
                uid,
                firstName,
                lastName,
                email,
                role
            })
            await newUser.save();
            return res.status(201).json({
                message: "User registered successfully!",
                role: newUser.role,
            })
        } else {
            return res.status(400).json({
                message: "User already exists",
                role: checkUserExists.role,
            })
        }
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})