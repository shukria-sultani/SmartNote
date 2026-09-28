import Users from "../models/users.js";
import AppError from "../utils/errorHandler.js"
import jwt from "jsonwebtoken"
export const authenticateUser = async(req, res, next)=>{
   const authHeader = req.headers.authorization;
  if(!authHeader){
    throw new AppError(401, "Token not found!")
  }
 try {
 const token = req.headers.authorization.split(" ")[1];
 const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
 const user = await Users.findByPk(decodedToken.id);
 if(!user){
    res.status(404).json({success: false, message: "User not found!"})
 }
 req.userId = user.id
 next();
 } catch (error) {
   if(error.name === "TokenExpiredError"){
      res.status(401).json({success: false, message: "Token has expired!"})
   }
   res.json({success: false, message: error.message})
 }
}