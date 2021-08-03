import { ProductsService } from "../services/Products.js";

const cardsContainer = document.getElementById('cards');
const productsService = new ProductsService();


const setProductsData = async () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const {name} = Object.fromEntries(urlSearchParams.entries());
    const products = await productsService.searchProducts(name);
    console.log(products);
    products.forEach(setCard);
}

setProductsData();

const setCard = (product) => {
    cardsContainer.innerHTML += `
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
    `
}