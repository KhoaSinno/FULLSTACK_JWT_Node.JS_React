import { raw } from 'body-parser';
import db from '../models/index'
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);

// hash password
const hashPassword = (userPass) => {
    const hashPass = bcrypt.hashSync(userPass, salt);
    // let checkPass = bcrypt.compareSync(password, hashPass);
    return hashPass
}
// check email/phone existed
const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })

    if (user) return true

    return false
}
const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })

    if (user) return true

    return false
}

const registerNewUser = async (rawUserData) => {

    try {
        // b1: check email/phone are existed
        let isEmailExist = await checkEmailExist(rawUserData.email)
        if (isEmailExist) {
            return {
                EM: 'The email is already exist',
                EC: '1'
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone)
        if (isPhoneExist) {
            return {
                EM: 'The phone is already exist',
                EC: '1'
            }
        }
        // b2: hash password
        let hashPasswordUser = hashPassword(rawUserData.password)
        // b3: create new user
        await db.User.create({
            email: rawUserData.email,
            phone: rawUserData.phone,
            username: rawUserData.username,
            password: hashPasswordUser
        })
        return {
            EM: 'A user created successfully',
            EC: '0'
        }
    } catch (e) {
        console.log('>>>>', e)
        return {
            EM: 'Something wrongs in service',
            EC: '-1'
        }
    }
}

module.exports = {
    registerNewUser
}