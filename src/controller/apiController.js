import loginRegisterService from '../service/loginRegisterService'

const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}
const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.password)
            return res.status(200).json({
                EM: 'Missing required parameter', // Error message
                EC: '1', // Error code
                DT: '' // data
            })
        if (req.body.password && req.body.password.length < 4)
            return res.status(200).json({
                EM: 'Your password have to over 3 letters', // Error message
                EC: '-1', // Error code
                DT: '' // data
            })

        // Service: Create new user
        let data = await loginRegisterService.registerNewUser(req.body) //req.body a object full in4

        return res.status(200).json({
            EM: data.EM, // Error message
            EC: data.EC, // Error code
            DT: '' // data
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error form server',
            EC: '-1',
            DT: ''
        })
    }
}
const handleLogin = async (req, res) => {

    try {
        let data = await loginRegisterService.handleLogin(req.body)

        //set cookie
        if (data?.DT?.access_token)
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 })

        return res.status(200).json({
            EM: data.EM, // Error message
            EC: data.EC, // Error code
            DT: data.DT // data
        })
    } catch (e) {
        console.log('>>>>>', e)
        return res.status(500).json({
            EM: 'error form server',
            EC: '-1',
            DT: ''
        })
    }


}
module.exports = {
    testApi,
    handleRegister,
    handleLogin
}