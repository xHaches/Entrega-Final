import { ProductsService } from "../services/Products.js";

const carousel = document.getElementById('carousel');
const features = document.getElementById('features');
const productsService = new ProductsService();
const setIndexPage = async () => {
    const {products} = await productsService.getProducts();
    console.log(products);

    products.forEach((product, index) => {
        index === 0 ? setCarouselData(product, carousel, true) :
            setCarouselData(product, carousel);
        index >= 3 && index <= 6 ?  setHeadingData(product, features) : null;
        index >= 7 && index <= 9 ? setFeaturetteData(product, features) : null;
    });
}
setIndexPage();

const setCarouselData = (product, element, firstItem = false) => {
    element.innerHTML +=
        `
    <div class="carousel-item" id="${product.id}">
    <img src="${product.img}" class="d-block w-100" alt="thumbnail">
    
    <div class="container">
      <div class="carousel-caption text-start">
        <h1 class="text-info">${product.description_}</h1>
        <p class="text-success">$${product.price}</p>
        <p><a class="btn btn-lg btn-primary" href="product-detail.html?id=${product.id}">Ver más</a></p>
      </div>
    </div>
    </div>
    `;
    const prodElement = document.getElementById(product.id);
    if (firstItem)
        prodElement.classList.add('active');
}
const setHeadingData = (product, element) => {
    element.innerHTML +=
        `
    <div class="col-lg-4">
        <img src="${product.img}"
        class="img-thumbnail rounded-circle w-25">
        <h2>${product.description_}</h2>
        <p>$${product.price}</p>
        <p><a class="btn btn-secondary" href="product-detail.html?id=${product.id}">Ver detalles &raquo;</a></p>
    </div>
    `;
}
const setFeaturetteData = (product, element) => {
    element.innerHTML +=
        `
    <hr class="featurette-divider">
    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">${product.description_}.</h2>
        <p class="lead">$${product.price}</p>
      </div>
      <div class="col-md-5">
      
      <a href="product-detail.html?id=${product.id}">
      <img src="${product.img}" class="featurette-image img-fluid mx-auto" width="500" height="500">
      </a>

      </div>
    </div>
    `;
}

