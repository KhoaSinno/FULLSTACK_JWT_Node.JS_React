import userService from '../service/userService'

const handleSayHello = (req, res) => {
    return res.render("home.ejs")
}
const handleUserPage = async (req, res) => {
    const userList = await userService.getUserList()

    return res.render("user.ejs", { userList })
}
const handleCreateNewUser = (req, res) => {
    let { email, password, username } = req.body

    // userService.createNewUser(email, password, username)

    return res.send("handleCreateNewUser")
}

module.exports = {
    handleSayHello, handleUserPage, handleCreateNewUser
}