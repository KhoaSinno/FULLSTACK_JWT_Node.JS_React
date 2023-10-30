import groupServices from '../service/groupServices'

const readFunc = async (req, res) => {
    try {
        let data = await groupServices.getGroups()
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
    readFunc
}