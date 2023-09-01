import mysql from 'mysql2'

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt_nodejs_react'
});


const handleSayHello = (req, res) => {
    return res.render("home.ejs")
}
const handleUserPage = (req, res) => {
    return res.render("user.ejs")
}
const handleCreateNewUser = (req, res) => {
    let { email, password, username } = req.body

    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, password, username],
        function (err, results, fields) {
            err && console.log(err)
            console.log(results); // results contains rows returned by server
        }
    );

    return res.send("handleCreateNewUser")
}

module.exports = {
    handleSayHello, handleUserPage, handleCreateNewUser
}