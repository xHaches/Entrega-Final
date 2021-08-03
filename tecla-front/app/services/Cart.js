class CartService {
    constructor(key) { //Declaración de clase
        this.key = key || "products";
        this.products = this.getProduct();
    }

    addProduct(product) {  //Función para añadir product
        if (!this.productExists(product.id)) {
            this.products.push(product);
            this.saveProduct();
        }
    }

    removeProduct(id) { //Función para eliminar product
        const index = this.products.findIndex(p => p.id === id);
        if (index != -1) {
            this.products.splice(index, 1);
            this.saveProduct();
        }
    }

    saveProduct() {  //Función para guardar product seleccionado
        localStorage.setItem(this.key, JSON.stringify(this.products));
    }

    getProduct() { //Función para obtener el product
        const codedProducts = localStorage.getItem(this.key);
        return JSON.parse(codedProducts) || [];
    }

    productExists(id) { //Función para ver la existencia del product
        return this.products.find(product => product.id === id);
    }

    count() { //Función para hacer conteo del product
        return this.products.length;
    }
}