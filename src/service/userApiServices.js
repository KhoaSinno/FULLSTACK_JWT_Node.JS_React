const db = require("../models")

const getAllUser = async () => {

    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
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
const createUser = async () => {
    try {
        await db.User.createUser()
    } catch (e) {
        console.log(e)
    }
}
const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            // update
            user.save({})
        } else {
            // not found user
        }

    } catch (e) {
        console.log(e)
    }
}
const deleteUser = async (id) => {
    try {
        await db.User.deleteUser({
            where: { id: id }
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getAllUser, createUser, updateUser, deleteUser
}