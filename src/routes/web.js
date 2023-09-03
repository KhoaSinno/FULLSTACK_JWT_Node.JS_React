import express from "express";
import homeController from "../controller/homeController"
const router = express.Router()

const initWebRoutes = (app) => {
    router.get("/", homeController.handleSayHello)
    router.get("/user", homeController.handleUserPage)
    console.log(`check web rout`)
    router.post("/users/create-user", homeController.handleCreateNewUser)
    router.post("/user-delete/:id", homeController.handleDelete)


    return app.use("/", router)
}


export default initWebRoutes