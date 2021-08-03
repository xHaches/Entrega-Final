import { LocalStorageService } from "../services/LocalStorage.js";
import { UserService } from "../services/user.js";

const form = document.getElementById('form');


form.addEventListener('submit', register);

async function register (e) {
    e.preventDefault();
    const name = form['name'].value;
    const surnames = form['surnames'].value;
    const email = form['email'].value;
    const phone_number = form['phone_number'].value;
    const adress = form['adress'].value;
    const password = form['password'].value;
    const confirmPassword = form['confirmPassword'].value;
    const id_status = 2;

    console.log({
        name,
        surnames,
        email,
        phone_number,
        adress,
        password,
        id_status
    });

    if(password && confirmPassword && password === confirmPassword){
        const data  = await UserService.createUser({
            name,
            surnames,
            email,
            phone_number,
            adress,
            password,
            id_status
        });

        if(data.errors) {
            alert(data.errors.map(item => item.msg))
        }
    
        if (data.id){
            location.replace('http://127.0.0.1:5500/login.html')
        }
        console.log(data);
        return;
    }

    alert('No dejar campos vacíos y las contraseñas deben ser iguales')


}