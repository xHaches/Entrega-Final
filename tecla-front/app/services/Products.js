import {
    allCategoriesApi,
    productsApi,
    categoriesApi,
    searchProducts,
} from "../globals/apiPaths.js";

import { LocalStorageService } from "./LocalStorage.js";


export class ProductsService {

    async getCategories() {
        const categories = await fetch(allCategoriesApi());
        return await categories.json();   
    }
    
    async getProductsByCategory(id_category) {
        const products = await fetch(`${categoriesApi()}/${id_category}`);
        return await products.json();
    }

    async getProducts() {
        const products = await fetch(productsApi());
        return await products.json();
    }
    
    async getProduct(id){
        const product = await fetch(`${productsApi()}/${id}`);
        return await product.json();
    }
    
    async searchProducts(name = '') {
        const products = await fetch(`${searchProducts()}/${name}`);
        return await products.json();
    }
    
    async createProduct(body){
        const products = await fetch(`${productsApi()}`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${LocalStorageService.getItem('token')}`
            }
        });
        return await products.json();    
    }
    
    async updateProduct(body = {}, id = ''){
        const updatedProduct = await fetch(`${productsApi()}/${id}`, {
            method: 'put',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${LocalStorageService.getItem('token')}`
            }
        });
        return await updatedProduct.json();    
    }
    
    async deleteProduct(body = {}, id = ''){
        const deletedProduct = await fetch(`${productsApi()}/${id}`, {
            method: 'delete',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${LocalStorageService.getItem('token')}`
            }
        });
        return await deletedProduct.json();    
    }
}