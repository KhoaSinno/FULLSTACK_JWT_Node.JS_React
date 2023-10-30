const db = require("../models")

const getGroups = async () => {
    try {
        let data = await db.Group.findAll({
            order: [['name', 'ASC']]
        })
        return {
            EM: 'Get groups success',
            EC: 0,
            DT: data
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Group isn\'t exist!',
            EC: 2,
            DT: []
        }
    }
}

module.exports = {
    getGroups
}