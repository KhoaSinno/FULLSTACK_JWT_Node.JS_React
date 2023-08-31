import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require('dotenv').config()

const app = express() // create server
const PORT = process.env.PORT || 8082

configViewEngine(app)
initWebRoutes(app)
app.listen(PORT, () => {
    console.log(`<<< Run web server ${PORT}`)
})