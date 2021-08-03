const { User } = require("../models");
const bcryptjs = require('bcryptjs');


const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'surnames', 'email', 'phone_number', 'adress', 'id_status'],
            where: {
                id_status: 2
            }
        });
        return res.json(users);
    } catch(err){
        console.log(err);
        return res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
}
const getUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.findByPk(id);
    if(user && user.id_status === 2) {
        delete user.dataValues.password;
        return res.json({
            user
        });
    }
    return res.status(404).json({
        msg: `No existe un usuario con el id ${id}`
    });
}

const postUser = async (req, res) => {
    const {body} = req;
    try {
        const user = await User.create({...body});

        // cifrar password
        const salt = bcryptjs.genSaltSync(10);
        user.password = bcryptjs.hashSync(body.password, salt);
        await user.save();
        delete user.dataValues.password;
        return res.json(user)
    }catch(err){
        console.log(err);
        return res.status(500).json({
            msg: 'Hable con el administrador',
            body
        })
    }
}

const putUser = async (req, res) => {
    const {id} = req.params;
    const {user: updatedUser} = req.body;
    try {
        const user = await User.findByPk(id);
        if(!user) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            })
        }
        const salt = bcryptjs.genSaltSync(10);
        updatedUser.password = bcryptjs.hashSync(updatedUser.password, salt);
        delete user.dataValues.password;
        user.update(updatedUser);
        return res.json(user)
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            msg: `Hable con el administrador`,
            body
        });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if(!user) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            })
        }
        await user.update({id_status: 1});
        return res.json(user);

    } catch(err){
        console.log(err);
        return res.status(500).json({
            msg: `Hable con el administrador`,
        });
    }
}

module.exports = {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser
}


