const { User } = require("../database/sequelize")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

module.exports = {
    login: async (req, res, next) => {
        if (!req.body.username || !req.body.password) {
            res.status(400).json({
                status: "error",
                message: "Username and Password are required"
            })
            return
        }
        let user = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        let isPasswordValid = user && await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordValid || !user) {
            res.status(403).json({
                status: "error",
                message: "Username or Password is incorrect",
            })
            return
        }
        let userToSign = {
            id: user.id,
            username: user.username,
            isAdmin: user.username === 'admin',
        }
        let toSign = {
            user: JSON.stringify(userToSign),
        }
        let token = jwt.sign(toSign, process.env.SECRET_KEY, { expiresIn: '3600s' })
        res.json({
            status: "ok",
            result: {
                token: token,
                user: user,
            }
        })
    },

    register: async (req, res, next) => {
        if (!req.body.username || !req.body.password) {
            res.status(400).json({
                status: "error",
                message: "Username And Password are required"
            })
            return
        }
        let exists = await User.count({
            where: {
                username: req.body.username
            }
        })
        if (exists) {
            res.status(400).json({
                status: "error",
                message: "User with this username already exists"
            })
            return
        }
        let salt = await bcrypt.genSalt(10)
        let password = await bcrypt.hash(req.body.password, salt)
        let user = await User.create({
            username: req.body.username,
            password: password,
        })
        res.json({
            status: "ok",
            result: user,
        })
    }

}