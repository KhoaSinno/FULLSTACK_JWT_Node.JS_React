import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require('dotenv').config()
import bodyParser from "body-parser";
import connection from "./config/connectDB";

const PORT = process.env.PORT || 8082
const app = express() // create server

//config body-parser to get data from client site (form frontend)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// check connect db
connection()

// config to use ejs
configViewEngine(app)
// route
initWebRoutes(app)
app.listen(PORT, () => {
    console.log(`<<< Run web server ${PORT}`)
})