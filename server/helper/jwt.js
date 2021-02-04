const jwt = require('jsonwebtoken')

function generateToken (input) {
  return jwt.sign(input, process.env.JWT_KEY)
}
function verifyToken (input) {
  return jwt.verify(input, process.env.JWT_KEY)
}

module.exports = { generateToken, verifyToken }