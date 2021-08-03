

const validateFileUploaded = (req, res, next) => {
    //.img, como se establece en el body
    console.log(req.files);
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.img) {
        return res.status(400).json(
            { msg: 'No hay archivos en la petición' }
        );
    }
    next();
}

module.exports = validateFileUploaded;