import {
    purchasesApi
} from "../globals/apiPaths.js";

import { LocalStorageService } from "./LocalStorage.js";


export class PurchaseService {

    static async newPurchase(body){
        const product = await fetch(`${purchasesApi()}`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${LocalStorageService.getItem('token')}`
            }
        });
        const data = await product.json();
        console.log(data);
        if(data.id){
            alert(`el producto: ${data.description_} ha sido comprado`);
        }
        alert(`Debe iniciar sesion primero`);
    }
    
}