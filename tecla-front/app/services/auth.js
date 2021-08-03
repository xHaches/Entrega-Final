import { LocalStorageService } from "./LocalStorage.js"

import {
    authApi
} from "../globals/apiPaths.js";

export const validateSession = () => {
    const token = LocalStorageService.getItem('token');
    if (token.error) {
        alert('Inicie sesion para continuar');
        return location.replace('http://127.0.0.1:5500/login.html') 
    }
    return true
}


export class AuthService {
    async login(body = {}) {
        console.log(body);
        const userAndToken = await fetch(`${authApi()}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/'
            }
        });
        return await userAndToken.json();    
    }
}