import express from "express"
import authRouter from "./router/auth.router"
import messagesRouter from "./router/messages.router"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

const app = express()
dotenv.config()

const port = process.env.PORT || 5000

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRouter)
app.use("/api/messages",messagesRouter)

app.listen(port,()=>{
  console.log(`Server is running on https://localhost:${port} ....`)
})