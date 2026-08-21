
import { where } from "sequelize";
import bcrypt from "bcrypt";
import Users from "../models/users.js";
export const createUser = async(userData)=> {
   const {name, lastName, email, password} = userData;
   
   if(!name || !lastName || !email || !password){
      throw new Error("Enter all the required data!")
   }
   const user = await Users.findOne({where:{email}});
   if(user){
    throw new Error("A user with this email already exits!")
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

