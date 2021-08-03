const { Product, Category } = require("../models");
const { postImg, putImg } = require("../services");


const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            attributes: ['id', 'description_', 'price', 'img', 'stock', 'id_category', 'id_status', 'id_user'],
            where: {
                id_status: 2
            }
        });
        return res.json({
            products
        });
    } catch(err){
        console.log(err);
        return res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            attributes: ['id', 'description_'],
        });
        return res.json({
            categories
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
}

const getProduct = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByPk(id);
    if(product && product.id_status === 2) {
        return res.json({
            product
        });
    }
    return res.status(404).json({
        msg: `No existe un usuario con el id ${id}`
    });
}

const getProductsByCategory = async (req, res) => {
    const { id_category } = req.params;
    const products = await Product.findAll({
        attributes: ['id', 'description_', 'price', 'img', 'stock', 'id_category', 'id_status', 'id_user'],
        where: {
            id_category,
            id_status: 2
        }
    })
    return res.json(products);
}

const searchProduct = async (req, res) => {
    const { name } = req.params;
    const products = await Product.findAll({
        attributes: ['id', 'description_', 'price', 'img', 'stock', 'id_category', 'id_status', 'id_user'],
        where: {
            description_: name,
            id_status: 2
        }
    })
    return res.json(products);
}

const postProduct = async (req, res) => {
    const {body} = req;
    //.img como se envia en el body del form
    const img = req.files.img;
    try {
        const imgUrl = await postImg(img);
        const product = await Product.create({...body, img: imgUrl});
        await product.save();
        return res.json(product)
    }catch(err){
        console.log(err);
        return res.status(500).json({
            msg: 'Hable con el administrador',
            body
        })
    }
}

const putProduct = async (req, res) => {
    const {id} = req.params;
    const {id_user, ...rest} = req.body; 

    try {
        const product = await Product.findByPk(id);
        if(!product || product.id_status === 1) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            })
        }
        const imgUrl = await putImg(req.files.img, product);
        //Si hay datos extra en el body que no existen en el modelo se ignoran
        await product.update({...rest, img: imgUrl});
        return res.json(product)
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            msg: `Hable con el administrador`,
            body
        });
    }

}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if(!product) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            })
        }
        //Si hay datos extra en el body que no existen en el modelo se ignoran
        await product.update({id_status: 1});
        return res.json(product);

    } catch(err){
        console.log(err);
        return res.status(500).json({
            msg: `Hable con el administrador`,
            body
        });
    }
}

module.exports = {
    getProducts,
    getProduct,
    getProductsByCategory,
    postProduct,
    putProduct,
    deleteProduct,
    searchProduct,
    getCategories
}


