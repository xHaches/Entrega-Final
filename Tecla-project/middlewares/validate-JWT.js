const { User } = require("../models");
const jwt = require('jsonwebtoken');

const validateJWT = async (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const {data} = jwt.verify(token, process.env.JWT_SEED);
        const user = await User.findByPk(data.id);
        console.log(user);
        if(!user || !user.id_status ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {validateJWT}