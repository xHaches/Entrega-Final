const rateLimit = require('express-rate-limit');

const corsOptions = {
    origin: function (origin, callback) {
        if (process.env.WHITE_LIST.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

const limiter = rateLimit({
    windowsMs: 15 * 60 * 1000, // 15min
    max: 1000,
    message: 'Excedió el limite de accesos a la API'
});


module.exports = { corsOptions, limiter }
