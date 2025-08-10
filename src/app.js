import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    //ALLOWED ORIGIN or client url allowed to make request to the backend
    origin: process.env.CORS_ORIGIN,
    credentials: true
    }
))

//configuration

//form data aceeptance -> json
app.use(express.json({limit: "16kb"}))

//url data acceptance
app.use(express.urlencoded({extended:true, limit: "16kb"}))

app.use(express.static("public"))
app.use(cookieParser())
export {app}

//when using middleware use app.use