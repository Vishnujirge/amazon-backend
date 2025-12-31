const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'mykart_secret_key';
module.exports = { jwt, JWT_SECRET };