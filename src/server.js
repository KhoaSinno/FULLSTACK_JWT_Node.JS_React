import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require('dotenv').config()

const PORT = process.env.PORT || 8082
const app = express() // create server

configViewEngine(app)
initWebRoutes(app)
app.listen(PORT, () => {
    console.log(`<<< Run web server ${PORT}`)
})