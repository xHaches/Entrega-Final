const Router = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');

const {login} = require('../controllers');

const router = Router();

router.post('/', [
    check('email', 'El email es obligatorio o no es valido').not().isEmpty().isString(),
    check('password', 'El password es obligatorio').not().isEmpty().isString(),
    validateFields
], login);

module.exports = router;