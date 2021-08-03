import { ProductsService } from "../services/Products.js";
const categories = document.getElementById('categories');
const searchForm = document.getElementById('searchForm');
const search = document.getElementById('search');

const productsService = new ProductsService();

const setCategoriesList = async () => {
    let {categories} = await productsService.getCategories();
    console.log(categories);
    categories.forEach((item, index) => {
        setCategories(item);
    });
}
setCategoriesList();

const setCategories = (category) => {
    categories.innerHTML +=
        `
        <li><a class="dropdown-item" href="by-category.html?id_category=${category.id}" id="${category.id}">${category.description_}</a></li>
        <li><hr class="dropdown-divider"></li>
        `;
}



const gotoSearch = (e) => {
    e.preventDefault();
    console.log(searchForm['term'].value);
    location.replace(`http://127.0.0.1:5500/search.html?name=${searchForm['term'].value}`)
}

search.addEventListener('click', gotoSearch);
