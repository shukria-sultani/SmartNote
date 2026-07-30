
import dotenv from "dotenv"
dotenv.config()
import sequelize from "./config/database.js";
import app from "./app.js"

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB Connected Successfully!")
        app.listen(process.env.PORT || 3000, () => {
            console.log("server is running on port", process.env.PORT)
        })
    } catch (error) {
        console.log("DB Connection Failed, error: ",error)
    }
}

startServer();
