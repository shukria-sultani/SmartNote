import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const generateTokens = (pyaload) => {
    const {id, email} = pyaload
    const accessToken = jwt.sign(
        {id, email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"10m"})
    const refreshToken = jwt.sign(
        {id, email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:"7d"}
    )
    return {accessToken, refreshToken};
}
export default generateTokens