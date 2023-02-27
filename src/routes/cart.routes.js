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
  let cart = await cartManager.getCartById(cId);
  if (cart) {
    res.send(cart);
  } else {
    res.send(`Cart not found`);
  }
});

routerCart.post("/", async (req, res) => {
  let newCart = await cartManager.addCart(req.body);
  res.send(newCart);
});

routerCart.post("/:cid/product/:pid", async (req, res) => {
  const cId = parseInt(req.params.cid);
  const pId = parseInt(req.params.pid);
  let updCart = await cartManager.updateCartById(cId, pId);
  res.send(updCart);
});

export default routerCart;
