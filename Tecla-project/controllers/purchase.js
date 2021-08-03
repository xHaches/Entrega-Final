

const newPurchase = (req, res) => {

    
    const {body} = req;

    return res.json(body);

}

module.exports = {
    newPurchase
}