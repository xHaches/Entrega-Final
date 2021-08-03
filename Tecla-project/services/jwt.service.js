
const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
    return new Promise((resolve, reject) => {
      const payload = user;
      jwt.sign({data: payload}, process.env.JWT_SEED, {
          expiresIn: '24h'
      }, (err, token = "") => {
        if(err) {
            console.log(err);
            return reject('No se pudo generar el token');
        }
        resolve(token);
      });
    });
}

const validateToken = (token) => {
    const result = jwt.verify(token, process.env.JWT_SEED);
    if(result) {
        return result;
    }
    throw new Error('Token no válido')
}


module.exports = {generateJWT, validateToken};
