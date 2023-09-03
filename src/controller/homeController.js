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
    await userService.createNewUser(email, password, username)
    return res.redirect("/user")
}

const handleDelete = async (req, res) => {
    await userService.deleteUser(req.params.id)
    return res.redirect("/user")
}

const handleUpdateUser = async (req, res) => {
    const id = req.body.id
    let { email, username } = req.body
    await userService.updateUser(email, username, id)
    return res.redirect("/user")
}

const getUserUpdate = async (req, res) => {
    const userList = await userService.getUserById(req.params.id)
    let user = {}
    if (userList && userList.length > 0) user = userList[0]
    return res.render("user-update.ejs", { user })
}

module.exports = {
    handleSayHello, handleUserPage, handleCreateNewUser, handleDelete, getUserUpdate, handleUpdateUser
}