import userApiServices from "../service/userApiServices"
import emailvalidator from 'email-validator'

const readFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let { page, limit } = req.query
            let data = await userApiServices.getUserWithPagination(+page, +limit)
            return res.status(200).json({
                EM: data.EM, // Error message
                EC: data.EC, // Error code
                DT: data.DT // data
            })
        } else {
            let data = await userApiServices.getAllUser()
            return res.status(200).json({
                EM: data.EM, // Error message
                EC: data.EC, // Error code
                DT: data.DT // data
            })
        }
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
        //validate
        if (!req.body.email || !req.body.phone || !req.body.password)
            return res.status(200).json({
                EM: 'Missing required parameter',
                EC: 1,
                DT: ''
            })
        if (!emailvalidator.validate(req.body.email)) {
            return res.status(200).json({
                EM: 'Email invalid',
                EC: 1,
                DT: ''
            })
        }

        if (req.body.password && req.body.password.length < 4)
            return res.status(200).json({
                EM: 'Your password have to over 3 letters',
                EC: -1,
                DT: ''
            })
        //create user
        let data = await userApiServices.createUser(req.body)
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
        let data = await userApiServices.deleteUser(req.body.id)
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
    readFunc, createFunc, updateFunc, deleteFunc
}