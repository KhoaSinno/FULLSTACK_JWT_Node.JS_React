import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors"
require('dotenv').config()
import bodyParser from "body-parser";
// import connection from "./config/connectDB";
import { createJWT, verifyJWT } from './middleware/JWTAction'
const PORT = process.env.PORT || 8082
const app = express() // create server
// config cors
configCors(app)

//config body-parser to get data from client site (form frontend)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// check connect db
// connection()

// test JWT
createJWT()
let data = verifyJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2lub28iLCJhZGRyZXNzIjoiQ1QiLCJpYXQiOjE2OTkwNzg0OTJ9.Y-I7ZRCDOT2BFdc5L0F89uAv-sBoiW-gqXSKwzJQyOU')
console.log(data)
// config to use ejs
configViewEngine(app)
// route
initWebRoutes(app)
initApiRoutes(app)
app.listen(PORT, () => {
    console.log(`<<< Run web server ${PORT}`)
})