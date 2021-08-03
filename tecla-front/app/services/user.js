import {
    usersApi
} from "../globals/apiPaths.js";

import { LocalStorageService } from "./LocalStorage.js";


export class UserService {

    static async createUser(body){
        const newUser = await fetch(`${usersApi()}`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            }
        });
        return await newUser.json();    
    }

}