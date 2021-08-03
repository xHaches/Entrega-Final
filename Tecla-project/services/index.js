const { postImg, putImg } = require("./file.service");
const { generateJWT, validateToken } = require("./jwt.service");
module.exports = {
    postImg,
    putImg,
    generateJWT,
    validateToken
}