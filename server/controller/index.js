const { json } = require('express');
const { User, Photo } = require('../models')
const { generatePassword, comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class Controller {
    static register(req, res) {
        const { email, password } = req.body
        const newUser = { email }
        newUser.password = generatePassword(password)
        User.create(newUser)
            .then(success => {
                res.status(201).json({ id: success.id, email: success.email })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static login(req, res) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(found => {
                if (!found) throw found
                const hasil = comparePassword(password, found.password)
                if (hasil === false) throw hasil
                const token = generateToken({
                    id: found.id,
                    email: found.email,
                    password: found.password
                })
                res.status(201).json({ id: found.id, email: found.email, access_token: token })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static photos(req, res) {
        console.log(req.user.id)
        Photo.findAll({
            where: {
                UserId: req.user.id
            }
        })
            .then(data => {
                res.status(201).json({ photos: data })
            })
            .catch(err => {
                res.status(500).json({ errors: err.errors })
            })
    }
}
module.exports = Controller