const bcrypt = require('bcryptjs')

function generatePassword(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function comparePassword(passwordInput, passwordDB) {
    return bcrypt.compareSync(passwordInput, passwordDB)
}

module.exports = { generatePassword, comparePassword }