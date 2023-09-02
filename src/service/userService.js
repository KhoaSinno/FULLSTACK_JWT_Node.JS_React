import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'


const hashPassword = (userPass) => {
    const hashPass = bcrypt.hashSync(userPass, salt);
    // let checkPass = bcrypt.compareSync(password, hashPass);
    return hashPass
}


const createNewUser = (email, password, username) => {
    const userHashPass = hashPassword(password)

    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, userHashPass, username],
        function (err, results, fields) {
            err && console.log(err)
        }
    )
}

const getUserList = async () => {
    // connection.query(
    //     'SELECT * from users',
    //     function (err, results, fields) {
    //         err && console.log(err)
    //         // console.log(results)
    //     }
    // )

    // create the connection to database
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt_nodejs_react', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows
    } catch (error) {
        console.log(`CHeck error: `, error)
    }

}

module.exports = {
    hashPassword, createNewUser, getUserList
}