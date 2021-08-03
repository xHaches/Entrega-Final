const Router = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');

const {
    newPurchase
}
    = require('../controllers');

const validateFileUploaded = require('../middlewares/validate-file');
const { dbValidators } = require('../helpers');
const { validateJWT } = require('../middlewares');

const router = Router();

router.post('/', [
    validateJWT,
    check('description_', 'La descripción es obligatoria').not().isEmpty().isString(),
    check('price', 'El precio es obligatorio').not().isEmpty().isNumeric(),
    check('stock', 'El stock es obligatorio').not().isEmpty().isInt(),
    check('id_category', 'El id de categoria es obligatorio').not().isEmpty().isInt(),
    check('id_status', 'El id de status es obligatorio').not().isEmpty().isInt(),
    validateFields
], newPurchase);

module.exports = router;
