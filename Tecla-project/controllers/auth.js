
const brcryptjs = require('bcryptjs');
const {generateJWT} = require('../services');
const {getUserByEmail} = require('../services/user.service');


const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    console.log(req.body);
    try {
        const user = await getUserByEmail(email);

        if (!user){
            return res.status(400).json({
                msg: 'Email o password incorrectos'
            })
        }
        if (!user.id_status){
            return res.status(400).json({
                msg: 'El usuario no existe'
            });
        }
        // verificar password
        const validPassword = brcryptjs.compareSync(password + '', user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Email o password incorrectos'
            });
        }
        delete user.dataValues.password;
        // Generar el JWT
        const token = await generateJWT(user);
        return res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = { login };





