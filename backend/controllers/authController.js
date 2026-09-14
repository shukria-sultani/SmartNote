import { createUser, loginUser } from "../services/authServices.js"

export const createNewUser = async (req, res) => {
    try {
        const { name, lastName, email, password } = req.body;
        const newUser = await createUser({ name, lastName, email, password })
        res.status(201).json({
            success: true,
            userData: newUser
        });
    } catch (error) {
        const statusCode = error.status || 500
        res.status(statusCode).json(
            {
                success: false,
                statusCode,
                message: error.message
            }
        )
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const deviceInfo = req.headers["user-agent"] || req.get("user-agent")
        const user = await loginUser({email, password, deviceInfo});
        const isProduction = process.env.NODE_ENV === "production"
        res.cookie("refreshToken", user.refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "lax",
            maxAge: 7*24*60*60*1000

        })
        res.status(201).json(
            {
                success: true,
                userData: {
                  id:  user.id,
                  name:  user.name,
                  email: user.email,
                  accessToken: user.accessToken
                }
                
            }
        )
    } catch (error) {
        const statusCode = error.status || 500
        res.status(statusCode).json(
            {
                success: false,
                statusCode,
                message: error.message
            }
        )
    }
}