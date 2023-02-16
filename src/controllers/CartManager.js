import * as fs from "fs";

class CartManager {
  constructor() {
    this.id = "";
    this.carts = [];
    this.path = "./src/models/carts.txt";
  }

  static addId() {
    if (this.id) {
      this.id++;
    } else {
      this.id = 1;
    }
    return this.id;
  }

  addCart = async (cartProds) => {
    let prevCarts = await fs.promises.readFile(this.path, "utf-8");
    let aux = JSON.parse(prevCarts);
    this.carts = aux;
    let newCart = { products: cartProds, id: CartManager.addId() };
    this.carts.push(newCart);

    await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
  };

  getCarts = async () => {
    let cont = await fs.promises.readFile(this.path, "utf-8");
    let aux = await JSON.parse(cont);
    this.carts = aux;
    return this.carts;
  };

  getCartById = async (id) => {
    let cont = await fs.promises.readFile(this.path, "utf-8");
    let aux = await JSON.parse(cont);
    this.carts = aux;

    for (let i = 0; i < this.carts.length; i++) {
      if (this.carts[i].id === parseInt(id)) {
        return this.carts[i];
      }
    }
    console.log("Carrrito no encontrado");
  };

  updateCartById = async (cId, pId, newprod) => {
    let updatedProd = { id: pId, quantity: newprod.quantity };
    let cont = await fs.promises.readFile(this.path, "utf-8");
    let aux = await JSON.parse(cont);
    this.carts = aux;
    let updCartIndex = this.carts.findIndex(
      (cart) => cart.id === parseInt(cId)
    );
    let updProdIndex = this.carts[updCartIndex].findIndex(
      (prod) => prod.id === parseInt(pId)
    );
    if (this.carts[updCartIndex].some((prod) => prod.id === parseInt(pId))) {
      this.carts[updCartIndex].products[updProdIndex].quantity =+ updatedProd.quantity;
    } else {
      this.carts[updCartIndex].push(updatedProd);
    }
    let update = await fs.promises.writeFile(this.path,JSON.stringify(this.carts));
  };

  deleteCartById = async (id) => {
    let cont = await fs.promises.readFile(this.path, "utf-8");
    let aux = await JSON.parse(cont);
    this.carts = aux;
    let delProdIndex = this.carts.findIndex((cart) => cart.id === id);
    console.log(`Se eliminará el carrito con ID: ${id}`),
      this.carts.splice(delProdIndex, 1);

    let update = await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.carts)
    );
  };
}

const cartManager = new CartManager();

export default cartManager;
