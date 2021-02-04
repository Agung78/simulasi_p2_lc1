const express = require('express')
const app = express.Router()
const Controller = require('../controller/index')
const { authenticate } = require('../middleware/auth.js')

app.post('/register', Controller.register)
app.post('/login', Controller.login)
app.use(authenticate)
app.get('/photos', Controller.photos)

module.exports = app