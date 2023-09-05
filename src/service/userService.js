import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
import db from '../models/index';

const hashPassword = (userPass) => {
    const hashPass = bcrypt.hashSync(userPass, salt);
    // let checkPass = bcrypt.compareSync(password, hashPass);
    return hashPass
}

const createNewUser = async (email, password, username) => {
    // to more security so we need hide password by hash this pass before we push to database
    const userHashPass = hashPassword(password)
    try {
        await db.User.create({
            username: username,
            email: email,
            password: userHashPass
        })
    } catch (error) {
        console.log(`CHeck error: `, error)
    }
}
const deleteUser = async (id) => {
    // create the connection to database
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt_nodejs_react', Promise: bluebird });
    // write query sql to read data
    try {
        const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?', [id]);
        return rows
    } catch (error) {
        console.log(id)
        console.log(`CHeck error: `, error)
    }
}

const updateUser = async (email, username, id) => {
    // create the connection to database
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt_nodejs_react', Promise: bluebird });
    // write query sql to read data
    try {
        const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username = ? WHERE id = ?', [email, username, id]);
        return rows
    } catch (error) {
        console.log(`CHeck error: `, error)
    }
}

const getUserList = async () => {
    // create the connection to database
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt_nodejs_react', Promise: bluebird });
    // write query sql to read data
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM user');
        return rows
    } catch (error) {
        console.log(`CHeck error: `, error)
    }
}

const getUserById = async (id) => {
    // create the connection to database
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt_nodejs_react', Promise: bluebird });
    // write query sql to read data
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id = ?', [id]);
        return rows
    } catch (error) {
        console.log(`CHeck error: `, error)
    }
}

module.exports = {
    hashPassword, createNewUser, getUserList, deleteUser, getUserById, updateUser
}