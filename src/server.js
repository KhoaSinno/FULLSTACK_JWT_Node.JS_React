import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require('dotenv').config()
import bodyParser from "body-parser";

const PORT = process.env.PORT || 8082
const app = express() // create server

//config body-parser to get data from client site (form frontend)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app)
initWebRoutes(app)
app.listen(PORT, () => {
    console.log(`<<< Run web server ${PORT}`)
})