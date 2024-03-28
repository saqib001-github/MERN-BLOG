import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config(); 

try {

    await mongoose.connect('mongodb+srv://saqibmohd582:ZDQ1J1BvuQVGWrdY@mern-blog.jjsiu.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog')
    console.log("Mongo DB is connected.");
} catch (err) {
    console.error('MongoDB connection error:', err);
}

const app = express();

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})

app.listen(3000, () => {
    console.log(`Listining on port 3000 `);
});

