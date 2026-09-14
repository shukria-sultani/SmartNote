
import { where } from "sequelize";
import bcrypt from "bcrypt";
import Users from "../models/users.js";
import AppError from "../utils/errorHandler.js";
import generateTokens from "../utils/jwt/generateTokens.js";
import RefreshTokens from "../models/refreshTokens.js";
export const createUser = async(userData)=> {
   const {name, lastName, email, password} = userData;
   
   if(!name || !lastName || !email || !password){
      throw new AppError(400, "Enter all the required data!")
   }
   const user = await Users.findOne({where:{email}});
   if(user){
    throw new AppError(400, "A user with this email already exits!")
   }
   const hashedPassword = await bcrypt.hash(password, 10);

   const newUser = await Users.create(
    {
        ...userData,
        password:hashedPassword
    }
   )
   return {
      name: newUser.name,
      lastName: newUser.lastName,
      email: newUser.email,
      createdAt: newUser.createdAt
   }; 
}

export const loginUser = async(credentials)=>{
  const {email, password, deviceInfo} = credentials;
  if(!email || !password){
     throw new AppError(400, "Email and Password are required!")
  }
  const user = await Users.findOne(
    {
      where: {email},
      attributes:{
        include: ["password"]
      } 
    
    }
  )
  if(!user){
    throw new AppError(404, "User not found!")
  }
  const doesPasswordMatch = await bcrypt.compare(password, user.password)
  if(!doesPasswordMatch){
    throw new AppError(400, "Invalid password!")
  }
  const tokenPaylod = {id: user.id, email: user.email}

  const {accessToken, refreshToken} = generateTokens(tokenPaylod);
    await RefreshTokens.create(
    {
      userId: user.id,
      token: await bcrypt.hash(refreshToken, 10),
      expiresAt: Date.now() + 7*24*60*60*1000,
      revokedAt: null,
      deviceInfo
      
    }
  )
  return {
    id:user.id,
    email: user.email,
    name: user.name,
    accessToken,
    refreshToken,
  }

}