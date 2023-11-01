const db = require("../models")
const getUserWithPagination = async (page, limit) => {
    try {
        //offset: the number of records that need to be skipped
        let offset = (page - 1) * limit
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
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
const createUser = async (data) => {
    try {
        await db.User.create(data)
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