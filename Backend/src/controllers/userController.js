// import User from "../database/models/user"
// let User = require("../database/models/user")
const {User} = require("../database/sequelize")
let bcrypt = require('bcrypt')

let login = (req, res, next) => {

}

let logout = (req, res, next) => {

}

let register = async (req, res, next) => {
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


module.exports = {login, logout, register}