import roleApiServices from "../service/roleApiServices"
import userApiServices from "../service/userApiServices"

// const readFunc = async (req, res) => {
//     try {
//         if (req.query.page && req.query.limit) {
//             let { page, limit } = req.query
//             let data = await userApiServices.getUserWithPagination(+page, +limit)
//             return res.status(200).json({
//                 EM: data.EM, // Error message
//                 EC: data.EC, // Error code
//                 DT: data.DT // data
//             })
//         } else {
//             let data = await userApiServices.getAllUser()
//             return res.status(200).json({
//                 EM: data.EM, // Error message
//                 EC: data.EC, // Error code
//                 DT: data.DT // data
//             })
//         }
//     } catch (e) {
//         console.log(e)
//         return res.status(500).json({
//             EM: 'error form server',
//             EC: '-1',
//             DT: ''
//         })
//     }
// }
const readFunc = async (req, res) => {
    try {

        let data = await roleApiServices.getAllRole()
        return res.status(200).json({
            EM: data.EM, // Error message
            EC: data.EC, // Error code
            DT: data.DT // data
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'error form server',
            EC: '-1',
            DT: ''
        })
    }
}
const createFunc = async (req, res) => {
    try {
        //create user
        let data = await roleApiServices.createRoles(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'error form server',
            EC: '-1',
            DT: ''
        })
    }
}
const updateFunc = async (req, res) => {
    try {
        //create user
        let data = await roleApiServices.updateRole(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'error form server',
            EC: '-1',
            DT: ''
        })
    }
}
const deleteFunc = async (req, res) => {
    try {
        let data = await roleApiServices.deleteRole(req.body.id)
        return res.status(200).json({
            EM: data.EM, // Error message
            EC: data.EC, // Error code
            DT: data.DT // data
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'error form server',
            EC: '-1',
            DT: ''
        })
    }
}
const getRoleByGroup = async (req, res) => {
    try {
        let id = req.params.groupId
        let data = await roleApiServices.getRoleByGroup(id)
        return res.status(200).json({
            EM: data.EM, // Error message
            EC: data.EC, // Error code
            DT: data.DT // data
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'error form server',
            EC: '-1',
            DT: ''
        })
    }
}
const assignRoleToGroup = async (req, res) => {
    try {
        let data = await roleApiServices.assignRoleToGroup(req.body.data)
        return res.status(200).json({
            EM: data.EM, // Error message
            EC: data.EC, // Error code
            DT: data.DT // data
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'error form server',
            EC: '-1',
            DT: ''
        })
    }
}


module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc, getRoleByGroup, assignRoleToGroup
}