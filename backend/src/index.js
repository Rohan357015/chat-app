
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser";
import messageRoutes from './routes/message.routes.js';
import { protectRoute } from './middleware/auth.middleware.js';
import cors from 'cors';
import path from 'path';



dotenv.config();

const app = express();
import authRoutes from './routes/auth.route.js';

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend' ,'dist','index.html'));
    });
}



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})