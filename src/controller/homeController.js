import userService from '../service/userService'

const handleSayHello = (req, res) => {
    return res.render("home.ejs")
}
const handleUserPage = async (req, res) => {
    const userList = await userService.getUserList()
    return res.render("user.ejs", { userList })
}
const handleCreateNewUser = async (req, res) => {
    let { email, password, username } = req.body
    console.log(`check controller`)

    await userService.createNewUser(email, password, username)

    return res.redirect("/user")
}

const handleDelete = async (req, res) => {
    console.log(`check controller`)

    await userService.deleteUser(req.params.id)
    return res.redirect("/user")
}

module.exports = {
    handleSayHello, handleUserPage, handleCreateNewUser,handleDelete
}