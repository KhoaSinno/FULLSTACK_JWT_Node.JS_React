import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'


const hashPassword = (userPass) => {
    const hashPass = bcrypt.hashSync(userPass, salt);
    // let checkPass = bcrypt.compareSync(password, hashPass);
    return hashPass
}


const createNewUser = async (email, password, username) => {
    // to more security so we need hide password by hash this pass before we push to database
    const userHashPass = hashPassword(password)

    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt_nodejs_react', Promise: bluebird });
    // write query sql to create user info
    try {
        console.log(`check service`)
        const [rows, fields] = await connection.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, userHashPass, username],);
        return rows
    } catch (error) {
        console.log(`CHeck error: `, error)
    }
}
const deleteUser = async (id) => {
    // create the connection to database
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt_nodejs_react', Promise: bluebird });
    // write query sql to read data
    try {
        console.log(`check service`)
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?', [id]);
        return rows
    } catch (error) {
        console.log(id)
        console.log(`CHeck error: `, error)
    }

}
const getUserList = async () => {
    // create the connection to database
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt_nodejs_react', Promise: bluebird });
    // write query sql to read data
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows
    } catch (error) {
        console.log(`CHeck error: `, error)
    }

}

module.exports = {
    hashPassword, createNewUser, getUserList, deleteUser
}