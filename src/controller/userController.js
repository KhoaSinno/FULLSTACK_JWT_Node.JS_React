import userApiServices from "../service/userApiServices"

const readFunc = async (req, res) => {
    try {
        let data = await userApiServices.getAllUser()
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