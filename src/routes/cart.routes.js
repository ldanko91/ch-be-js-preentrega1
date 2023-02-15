import { Router } from "express";
import cartManager from "../controllers/CartManager.js";
const routerCart = Router();

routerCart.get("/", async (req, res) => {
  let carts = await cartManager.getCarts();
  let limit = parseInt(req.query.limit);
  if (limit) {
    let cartsLtd = carts.slice(0, limit);
    res.send(cartsLtd);
  } else {
    res.send(carts);
  }
});

routerCart.get("/:cid", async (req, res) => {
  const cId = req.params.cid;
  let cart = await productManager.getCartByID();
  if (cart) {
    res.send(cart);
  } else {
    res.send(`El carrito no existe`);
  }
});

routerCart.post("/", async (req, res) => {
  let newCart = await cartManager.addCart(req.body);
  res.send(newCart);
  res.send("Producto Cargado");
});

routerCart.post("/:cid/products/:pid", async (req, res) => {
  const cId = req.params.cid;
  const pId = req.params.pid;
  let newCart = await cartManager.addCart(cId, pId, req.body);
  res.send(newCart);
  res.send("Carrito actualizado");
});

export default routerCart;
