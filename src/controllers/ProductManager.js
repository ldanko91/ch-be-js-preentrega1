import * as fs from "fs";
import { Product } from "./Product.js";

class ProductManager extends Product {
  constructor(title, description, price, code, stock, status, category, thumbnail) {
    super(title, description, price, code, stock, status, category, thumbnail);
    this.id = "";
    this.products = [];
    this.path = "./src/models/products.txt";
  }

  static addId() {
    if (this.id) {
      this.id++;
    } else {
      this.id = 1;
    }
    return this.id;
  }

  addProduct = async ({title, description, price, code, stock, status, category, thumbnail}) => {
    let cont = await fs.promises.readFile(this.path, "utf-8");
    let aux = JSON.parse(cont);
    this.products = aux;

    if (!title || !description || !price || !thumbnail || !code || !stock || !status || !category) {
      console.log("All fields are required");
      return;
    }

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].code === code) {
        console.log("Code must be unique");
        return;
      }
    }

    this.products.push({
      id: ProductManager.addId(),
      title,
      description,
      price,
      code,
      stock,
      status,
      category,
      thumbnail,
    });

    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
  };

  getProducts = async () => {
    let cont = await fs.promises.readFile(this.path, "utf-8");
    let aux = await JSON.parse(cont);
    this.products = aux;
    return this.products;
  };

  getProductById = async (id) => {
    let cont = await fs.promises.readFile(this.path, "utf-8");
    let aux = await JSON.parse(cont);
    this.products = aux;

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        return this.products[i];
      }
    }
    console.log("Not found");
  };

  updateProductById = async ({id, title, description, price, code, stock, status, category, thumbnail}) => {
    let updatedProd = {id, title, description, price, code, stock, status, category, thumbnail};
    console.log(updatedProd)
    let cont = await fs.promises.readFile(this.path, "utf-8");
    let aux = await JSON.parse(cont);
    this.products = aux;
    let updProdIndex = this.products.findIndex((product) => product.id === parseInt(id));
    this.products.splice(updProdIndex, 1);
    this.products.push(updatedProd);

    let update = await fs.promises.writeFile(this.path, JSON.stringify(this.products));
  };

  deleteProductById = async (id) => {
    let cont = await fs.promises.readFile(this.path, "utf-8");
    let aux = await JSON.parse(cont);
    this.products = aux;
    let delProdIndex = this.products.findIndex((product) => product.id === parseInt(id));
    console.log(`Se eliminará el producto con ID: ${id}`),
      this.products.splice(delProdIndex, 1);

    let update = await fs.promises.writeFile(this.path, JSON.stringify(this.products));
  };
}

//                                     title,            description,                       price,     code,     stock,     status,    category,   thumbnail
// const load = async () => {
//   await productManager.addProduct("tanque 500 bic", "Tanque para agua de 500 L Bicapa", 15000,     "tanq500B" , 11, true, "tanques"  , ["../public/img/500bcp.jpg"]);
//   await productManager.addProduct("tanque 750 bic", "Tanque para agua de 750 L Bicapa", 18000,     "tanq750B" , 12, true, "tanques"  , ["../public/img/750bcp.jfif"]);
//   await productManager.addProduct("tanque 1000 bic", "Tanque para agua de 1000 L Bicapa", 24000,   "tanq1000B", 14, true, "tanques", ["../public/img/500bcp.jpg"]);
//   await productManager.addProduct("tanque 500 tric", "Tanque para agua de 500 L Tricapa", 18000,   "tanq500T" , 10, true, "tanques"  , ["../public/img/500tcp.png"]);
//   await productManager.addProduct("tanque 750 tric", "Tanque para agua de 750 L Tricapa", 22000,   "tanq750T" , 14, true, "tanques"  , ["../public/img/750tcp.png"]);
//   await productManager.addProduct("tanque 1000 tric", "Tanque para agua de 1000 L Tricapa", 28000, "tanq1000T", 8 , true, "tanques" , ["../public/img/500bcp.jpg"]);
//   await productManager.addProduct("vanitory 50 std", "Vanitory de 50 cm standard", 19000,  "van50std"  , 14 , true, "vanitorys", ["../public/img/std50.jpg"]);
//   await productManager.addProduct("vanitory 60 std", "Vanitory de 60 cm standard", 24000,  "van60std"  , 10 , true, "vanitorys", ["../public/img/std60.jpg"]);
//   await productManager.addProduct("vanitory 50 maral", "Vanitory de 50 cm Maral", 24000,    "van50mar"  , 10, true, "vanitorys", ["../public/img/maral50.jpg"]);
//   await productManager.addProduct("vanitory 60 maral", "Vanitory de 60 cm Maral", 28000,    "van60mar"  , 12, true, "vanitorys", ["../public/img/maral60.jpg"]);
//   await productManager.addProduct("bomba de agua 1/2", "bomba de agua de 1/2 HP", 12000,    "bom12hp"   , 55, true, "vanitorys", ["../public/img/qb60.jpg"]);
//   await productManager.addProduct("bomba de agua 3/4", "bomba de agua de 3/4 HP", 22000,    "bom34hp"   , 35, true, "vanitorys", ["../public/img/qb60.jpg"]);
// }

const productManager = new ProductManager();

// load()

export default productManager;
