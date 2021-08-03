const {Product} = require('../models');

const {v2: cloudinary} = require('cloudinary');

const postImg = async(img) => {
    const {tempFilePath} = img;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath, { folder: 'Ecommerce'});
    return secure_url;
}

const putImg = async(file, product) => {
    if(product.img) {
        const nameArr = product.img.split('/');
        const name = nameArr[nameArr.length -1];
        const [public_id] = name.split('.');
        cloudinary.uploader.destroy('Ecommerce/'+public_id);
    }
    const {tempFilePath} = file;
    const {secureUrl} = await cloudinary.uploader.upload(tempFilePath, { folder: 'Ecommerce'})
    return secureUrl;

}

module.exports = {postImg, putImg}