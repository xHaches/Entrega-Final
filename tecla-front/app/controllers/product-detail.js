import { LocalStorageService } from "../services/LocalStorage.js";
import { ProductsService } from "../services/Products.js";
import { PurchaseService } from "../services/Purchase.js";

const mainCard = document.getElementById('mainCard');
// const features = document.getElementById('features');
const productsService = new ProductsService();

const related = document.getElementById('related');


const setProductDetailData = async () => {

    const urlSearchParams = new URLSearchParams(window.location.search);
    const {id} = Object.fromEntries(urlSearchParams.entries());
    let {product} = await productsService.getProduct(id);
    
    let {categories} = await productsService.getCategories();

    const category = categories.find(category => category.id === product.id_category);

    product.id_category === category.id ? product.category = category.description_ : null;
    console.log(product);
    setMainCardData(product)

    const relatedProducts = await productsService.getProductsByCategory(category.id);

    console.log(relatedProducts);

    relatedProducts.forEach((product, index) => {
        setRelatedProductsData(product);
    });
}
setProductDetailData();

const buyProduct = async (product) => {
    await PurchaseService.newPurchase(product);
}

const addToCart = (product) => {
    LocalStorageService.addArrayItem('cart', product);
    alert('Agregado al carrito');
}

const setMainCardData = (product) => {
    mainCard.innerHTML = `
    <div class="card">
                <img src="${product.img}"
                    class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.description_}</h5>
                    <p class="card-text">Id: ${product.id}</p>
                </div>
                <div class="bd-example">
                    <nav>
                        <div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                            <a class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#general" role="tab"
                                aria-controls="general" aria-selected="true">General</a>
                            <a class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" href="#others" role="tab"
                                aria-controls="others" aria-selected="false">Otros</a>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="general" role="tabpanel"
                            aria-labelledby="nav-home-tab">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Precio: ${product.price}</li>
                                <li class="list-group-item">Disponibles: ${product.stock}</li>
                            </ul>
                        </div>
                        <div class="tab-pane fade" id="others" role="tabpanel" aria-labelledby="nav-contact-tab">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Categoría: ${product.category}</li>
                            </ul>
                        </div>
                        <div class="card-body">
                            <button type="button" class="btn btn-primary w-100 mb-3" id="buy">Comprar</button>
                            <button type="button" class="btn btn-success w-100" id="toCart">Al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
    
    `
    document.getElementById('toCart').addEventListener('click', (e) => addToCart(product))
    document.getElementById('buy').addEventListener('click', (e) => buyProduct(product))
}

const setRelatedProductsData = async (product) => {
    console.log(product);
    related.innerHTML += `
        <a href="product-detail.html?id=${product.id}" style="text-decoration: none;">
        <div class="col mb-4">
            <div class="card pointer">
                <img src="${product.img}"
                    class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.description_}</h5>
                    <p class="card-text">${product.price}</p>
                </div>
            </div>
        </div>
        </a>
    `;
}

