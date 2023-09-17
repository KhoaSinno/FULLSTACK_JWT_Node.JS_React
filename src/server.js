import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require('dotenv').config()
import bodyParser from "body-parser";
// import connection from "./config/connectDB";

const PORT = process.env.PORT || 8082
const app = express() // create server
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//config body-parser to get data from client site (form frontend)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// check connect db
// connection()

// config to use ejs
configViewEngine(app)
// route
initWebRoutes(app)
app.listen(PORT, () => {
    console.log(`<<< Run web server ${PORT}`)
})