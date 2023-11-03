import { checkEmailExist, checkPhoneExist, hashPassword } from './loginRegisterService'
const db = require("../models")
import emailvalidator from 'email-validator'


const getUserWithPagination = async (page, limit) => {
    try {
        //offset: the number of records that need to be skipped
        let offset = (page - 1) * limit
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "sex", 'address'],
            include: { model: db.Group, attributes: ["name", "description", 'id'] },
            order: [['id', 'DESC']]

        })
        let totalPerPages = Math.ceil(count / limit)

        let data = {
            totalRow: count, totalPerPages, users: rows
        }

        return {
            EM: 'fetch ok',
            EC: 0,
            DT: data
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrong with service',
            EC: 1,
            DT: []
        }
    }
}

const getAllUser = async () => {

    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] }
        })

        return users ? {
            EM: 'Get success user',
            EC: 0,
            DT: users
        } : {
            EM: 'Get success user',
            EC: 0,
            DT: []
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrong with service',
            EC: 1,
            DT: []
        }
    }
}
const createUser = async (data) => {
    try {
        //CHECK VALIDATE
        if (!data.email || !data.phone || !data.password)
            return {
                EM: 'Missing required parameter',
                EC: 1,
                DT: ''
            }
        if (!emailvalidator.validate(data.email)) {
            return {
                EM: 'Email invalid',
                EC: 1,
                DT: 'email'
            }
        }

        if (data.password && data.password.length < 4)
            return {
                EM: 'Your password have to over 3 letters',
                EC: -1,
                DT: 'password'
            }
        // b1: check email/phone are existed
        let isEmailExist = await checkEmailExist(data.email)
        if (isEmailExist) {
            return {
                EM: 'The email is already exist',
                EC: '1',
                DT: 'email'
            }
        }
        let isPhoneExist = await checkPhoneExist(data.phone)
        if (isPhoneExist) {
            return {
                EM: 'The phone is already exist',
                EC: '1',
                DT: 'phone'
            }
        }
        // b2: hash password
        let hashPasswordUser = hashPassword(data.password)

        // CREATE
        await db.User.create({ ...data, password: hashPasswordUser })
        return {
            EM: 'Create success user',
            EC: 0,
            DT: []
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrong with service',
            EC: 1,
            DT: []
        }
    }
}
const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: 'Error with empty GroupId',
                EC: 1,
                DT: 'group'
            }
        }
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            // update
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            })
            return {
                EM: 'Update user success',
                EC: 0,
                DT: ''
            }
        } else {
            // not found user
            return {
                EM: 'User not found',
                EC: 2,
                DT: ''
            }
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrong with service',
            EC: 1,
            DT: []
        }
    }
}
const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })

        if (user) {
            await user.destroy();
            return {
                EM: 'Success delete',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'User isn\'t exist!',
                EC: 2,
                DT: []
            }
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrong with service',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getAllUser, createUser, updateUser, deleteUser, getUserWithPagination
}