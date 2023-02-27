import * as fs from "fs";

class CartManager {
  constructor() {
    this.id = "";
    this.carts = [];
    this.path = "./src/models/carts.txt";
  }

  addCart = async (cartProds) => {
    let prevCarts = await fs.promises.readFile(this.path, "utf-8");
    let aux = JSON.parse(prevCarts);
    this.carts = aux;
    if (this.carts.length < 1) {this.id = 1} else {
    let prevIds = this.carts.map(cart => parseInt(cart.id));
    this.id = (Math.max(...prevIds) + 1)};

    let newCart = { products: cartProds, id: this.id };
    this.carts.push(newCart);

    await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
    let addedCart = "Cart added successfully";
    return addedCart
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
    let cartNotFound = "Cart not found"
    return cartNotFound;
  };

  updateCartById = async (cId, pId) => {
    let cont = await fs.promises.readFile(this.path, "utf-8");
    let aux = await JSON.parse(cont);
    this.carts = aux;
    const isCart = this.carts.find((cart) => cart.id === cId); 
    if (!isCart) { return `There is no Cart with ID: ${cId}`; } 
    else {
    
      let updCartIndex = this.carts.findIndex(cart => cart.id == cId);
      let updCartProds = this.carts[updCartIndex].products;
      let updProdIndex = updCartProds.findIndex(prod => prod.id == pId)

      if (updCartProds.some(prod => prod.id == pId)) {
        this.carts[updCartIndex].products[updProdIndex].quantity ++;
        
      } else {
        let newProd = {id: pId, quantity: 1}
        this.carts[updCartIndex].products.push(newProd);
      }
    }

    let update = await fs.promises.writeFile(this.path,JSON.stringify(this.carts));
    let mssgUpdProd = `The product with ID ${pId} was updated successfully`
    return mssgUpdProd
  };

  deleteCartById = async (id) => {
    let cont = await fs.promises.readFile(this.path, "utf-8");
    let aux = await JSON.parse(cont);
    this.carts = aux;
    let delProdIndex = this.carts.findIndex((cart) => cart.id === id);
      this.carts.splice(delProdIndex, 1);

    let update = await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.carts)
    );
  };
}

const cartManager = new CartManager();

export default cartManager;
