/**
 * config to hide other file
 * param app is express
 */

import express from "express"

const configViewEngine = (app) => {
    app.use(express.static('./src/public'))
    app.set("view engine", "ejs") //use ejs to write html with nodejs
    app.set("views", "./src/views") //this place save out put data
}
export default configViewEngine