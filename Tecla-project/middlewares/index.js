const { limiter, corsOptions } = require('./cors');
const { validateFields } = require('./validate-fields');
const {validateJWT} = require('./validate-JWT');

module.exports = {
    limiter, corsOptions, validateFields, validateJWT
}

