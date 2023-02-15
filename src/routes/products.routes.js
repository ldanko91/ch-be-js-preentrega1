import { Router } from "express";
import productManager from "../controllers/ProductManager.js";
const routerProduct = Router();

routerProduct.get("/", async (req, res) => {
  let products = await productManager.getProducts();
  let limit = parseInt(req.query.limit);
  if (limit) {
    let prodsLtd = products.slice(0, limit);
    res.send(prodsLtd);
  } else {
    res.send(products);
  }
});

routerProduct.get("/:pid", async (req, res) => {
  const pId = req.params.pid;
  let product = await productManager.getProductById(parseInt(pId));
  if (product) {
    res.send(product);
  } else {
    res.send(`El producto no existe`);
  }
});

routerProduct.post("/", async (req, res) => {
  let uploadProd = await productManager.addProduct(req.body);
  res.send(uploadProd);
  // res.send("Producto Cargado");
});

routerProduct.delete("/:pid", async (req, res) => {
  const pId = req.params.pid;
  let dropProd = await productManager.deleteProductById(pId);
  res.send(`El producto con id ${pId} ha sido eliminado`);
});

routerProduct.put("/:pid", async (req, res) => {
  const pId = req.params.pid;
  let updProduct = await productManager.updateProductById(req.body);
  res.send(`El producto con id ${pId} ha sido actualizado`);
});

export default routerProduct;
