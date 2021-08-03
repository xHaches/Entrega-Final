import { LocalStorageService } from "../services/LocalStorage.js";
import {validateSession} from '../services/auth.js';
import { PurchaseService } from "../services/Purchase.js";

const cartContent = document.getElementById('cartContent');
const cartCount = document.getElementById('cartCount');
const buyButton = document.getElementById('buyButton');


const setCartData = () => {
    let cartItems = LocalStorageService.getItem('cart');
    cartCount.innerText = cartItems.length || 0; 
    console.log(cartItems);
    cartItems.forEach?.((product, index) => {
        setItemData(product, index);
        addListeners(index);
    });
    activeBuyButton(cartItems);
}

const setItemData = (product, index) => {
    cartContent.innerHTML += `
    <li class="list-group-item d-flex justify-content-between lh-sm">
    <div>
    <h6 class="my-0">${product.description_}</h6>
    <small class="text-muted">id: ${product.id}</small>
    </div>
    <span class="text-muted">$${product.price}</span>
        <button type="button" class="btn btn-danger" id="cart${index}">Eliminar</button>
    </li>
    `; 
}

const addListeners = (index) => {
    document.getElementById('cart'+index).addEventListener('click', (e) => {
        deleteItem(index);
        cartContent.innerHTML = '';
        let cartItems = LocalStorageService.getItem('cart');
        cartItems.forEach?.((product, index) => {
            setItemData(product, index);
            addListeners(index);
        }); 
        cartCount.innerText = cartItems.length || 0; 
    });
}

const deleteItem = (index) => {
    LocalStorageService.removeArrayItem('cart', index);
}

const buyProduct = async (cartItems) => {
    if(validateSession()) {
        await Promise.all(cartItems.map((item, index) => PurchaseService.newPurchase(item)));
        LocalStorageService.removeItem('cart');
        cartContent.innerHTML = '';
    }

}

const activeBuyButton = (cartItems) => {
    buyButton.innerHTML = `
    <button type="button" class="btn btn-primary w-100 mb-3" id="buy">Comprar</button>
    `;
    document.getElementById('buy').addEventListener('click', (e) => buyProduct(cartItems))


}

setCartData();