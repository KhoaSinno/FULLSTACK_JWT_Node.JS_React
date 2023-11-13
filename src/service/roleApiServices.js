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

module.exports = {
    createRoles
}