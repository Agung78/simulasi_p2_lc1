const { verifyToken } = require('../helper/jwt.js')
const { User } = require('../models')

async function authenticate(req, res, next) {
    try {
        const access_token = req.headers.access_token
        if (!access_token) {
            res.status(400).json({
                msg: 'Please login'
            })
        } else {
            const email = verifyToken(access_token).email
            const find = await User.findOne({ where: { email } })
            if (!find) {
                res.status(400).json({
                    msg: "Please login"
                })
            } else {
                req.user = {
                    id: find.id,
                    email: find.email
                }
                next()
            }
        }
    } catch (err) {
        res.status(500).json({ err: 'error from authenticate' })
        // console.log(err, 'error from authenticate')
    }
}

module.exports = { authenticate }