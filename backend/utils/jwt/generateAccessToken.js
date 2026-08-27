import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export  const generateAccessToken = (id, email) => {
    const token = jwt.sign(
        {id, email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRE})
    return token;
}