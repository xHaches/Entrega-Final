import { AuthService } from "../services/auth.js";
import { LocalStorageService } from "../services/LocalStorage.js";

const authService = new AuthService();

const form = document.getElementById('form');


form.addEventListener('submit', login);

async function login (e) {
    e.preventDefault();
    const email = form['email'].value;
    const password = form['password'].value;
    const data  = await authService.login({email, password});

    if (data.token){
        LocalStorageService.setItem('token', data.token);
        location.replace('http://127.0.0.1:5500/index.html')
        return;
    }
    console.log(data);
    alert(data.errors.map(item => item.msg))

}