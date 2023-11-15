import jwt from 'jsonwebtoken';
require('dotenv').config()

const nonSecurePaths = ['/logout', '/login', '/register']

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET
    let token = null
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
    } catch (error) {
        console.log(error)
    }
    return token
}

const verifyJWT = (token) => {
    let key = process.env.JWT_SECRET
    let decoded = null
    try {
        decoded = jwt.verify(token, key)
    } catch (e) {
        console.log(e)
    }
    return decoded
}
const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}
// middleware check login user
const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next()

    let tokenFromHeader = extractToken(req)
    let cookies = req.cookies

    if ((cookies && cookies.jwt) || tokenFromHeader) {
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader
        let decoded = verifyJWT(token)
        if (decoded) {
            req.user = decoded // info user (email, group, roles....)
            req.token = token
            next()
        } else {
            return res.status(401).json({
                EM: 'Not authenticated the user',
                EC: -1,
                DT: ''
            })
        }
    } else {
        return res.status(401).json({
            EM: 'Not authenticated the user',
            EC: -1,
            DT: ''
        })
    }
}

// middleware check permission
const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/account') return next()
    if (req.user) {
        let email = req.user.email // more and more be carefully
        let roles = req.user.getGroupWithRole.Roles
        let currentUrl = req.path
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EM: `You don't have permission to this access resource...`,
                EC: -1,
                DT: ''
            })
        }
        let canAccess = roles.some((role) => role.url === currentUrl || currentUrl.includes(role.url))
        if (canAccess) {
            next()
        } else {
            return res.status(403).json({
                EM: `You don't have permission to this access resource...`,
                EC: -1,
                DT: ''
            })
        }
    } else {
        return res.status(401).json({
            EM: 'You don\'t have permission',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    createJWT, verifyJWT, checkUserJWT, checkUserPermission
}