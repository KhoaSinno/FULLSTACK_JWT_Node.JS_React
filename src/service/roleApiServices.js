const db = require("../models")

const createRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })
        const persist = roles.filter(({ url: url1 }) =>
            !currentRoles.some(({ url: url2 }) => url2 === url1))
        if (persist.length === 0) {
            return {
                EM: 'Nothing to Create...',
                EC: 0,
                DT: []
            }
        }
        await db.Role.bulkCreate(persist)
        return {
            EM: `Create success ${persist.length} Roles`,
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
const getAllRole = async () => {
    try {
        let data = await db.Role.findAll({
            order: [['id', 'DESC']]
        })
        return {
            EM: `Get success All Roles`,
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
const deleteRole = async (id) => {
    try {
        let roleDel = await db.Role.findOne({
            where: { id: id }
        })
        if (roleDel) {
            await roleDel.destroy()
            return {
                EM: `Delete success`,
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: `Don't have this role...`,
                EC: 0,
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
const updateRole = async (data) => {
    try {
        let role = await db.Role.findOne({
            where: { id: data.id }
        })
        if (role) {
            // update
            await role.update({
                url: data.url,
                description: data.description,
            })
            return {
                EM: 'Update role success',
                EC: 0,
                DT: ''
            }
        } else {
            // not found role
            return {
                EM: 'Role not found',
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

const getRoleByGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: 'Not found any Role',
                EC: 0,
                DT: ''
            }
        }

        let role = await db.Group.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'name', 'description'],
            include: {
                model: db.Role,
                attributes: ['id', 'url', 'description'],
                through: { attributes: [] }
            }
        })
        return {
            EM: 'Get Role by Group success',
            EC: 0,
            DT: role
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
    createRoles, getAllRole, deleteRole, updateRole, getRoleByGroup
}