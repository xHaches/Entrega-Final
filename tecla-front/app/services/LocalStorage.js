
export class LocalStorageService {

    static setItem(key = 'error', value = {error: 'error, no has ingresado un objeto'}) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getItem(key = '') {
        return JSON.parse(localStorage.getItem(key)) || {error: `Error: el item ${key} no existe`};
    }

    static removeItem(key){
        localStorage.removeItem(key);
    }

    static addArrayItem(key, payload) {
        const data = localStorage.getItem(key) ||  '[]';
        let items = JSON.parse(data);
        items.push(payload);
        this.setItem(key, items)
    }

    static removeArrayItem(key, index) {
        let items = this.getItem(key);

        items.splice(index, 1);
        this.setItem(key, items);
    }

}