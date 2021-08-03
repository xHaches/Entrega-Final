const Router = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares');

const {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser
}
    = require('../controllers');

const { dbValidators } = require('../helpers');

const router = Router();

router.get('/', getUsers);

router.get('/:id', [
    check('id', 'El término de búsqueda es obligatorio').not().isEmpty().isInt(),
    validateFields
], getUser);



router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty().isString(),
    check('surnames', 'El apellido es obligatorio').not().isEmpty().isString(),
    check('email', 'El correo es obligatorio').not().isEmpty().isString(),
    check('email').custom(dbValidators.emailExists),
    check('password', 'La contraseña es obligatorio').not().isEmpty().isString(),
    check('phone_number', 'El número es obligatorio').not().isEmpty().isString(),
    check('adress', 'La dirección es obligatorio').not().isEmpty().isString(),
    validateFields
], postUser);

router.put('/:id', [
    validateJWT,
    check('id', 'El id es obligatorio').not().isEmpty().isInt(),
    check('id').custom(dbValidators.userExistsById),
    validateFields
], putUser);

router.delete('/:id', [
    validateJWT,
    check('id', 'El id es obligatorio').not().isEmpty().isInt(),
    check('id').custom(dbValidators.userExistsById),
    validateFields
], deleteUser)

module.exports = router;
