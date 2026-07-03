import express from "express"
import dotenv from "dotenv"
dotenv.config()

const server = express()

server.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running on port", process.env.PORT)
})