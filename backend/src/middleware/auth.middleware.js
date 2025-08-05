import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import cookieParser from 'cookie-parser';



export const protectRoute = async (req, res, next) => {
     try {
         console.log("Cookies received:", req.cookies);
    const token = req.cookies.jwt;
   
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

   
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        if(!decoded){
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await User.findById(decoded.userId).select("-password");
         console.log("User found:", user);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
