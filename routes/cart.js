const verifyToken = require("../utils/verify");
const router = require("express").Router()
const Cart = require(("../models/carts"))
const jwt = require("jsonwebtoken")

router.post("/add-cart",verifyToken, async (req, res) => {
    const token = req.cookies.access_token;
    const decodedToken = jwt.verify(token, process.env.jwt);
    const userId = decodedToken.id;
    console.log(userId)
    const product={
      productId: req.body.id,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity
    }
    console.log(product)
    const cart = new Cart({userId, products: [product]});
    try {
      // Lưu giỏ hàng
      const saveCart = await cart.save();
  
      res.status(200).json(saveCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/getcart/:userID", async(req, res)=>{
    const token = req.cookies.access_token;
    const decodedToken = jwt.verify(token, process.env.jwt);
    const userId = decodedToken.id;
    try{
      const cart = await Cart.find({userId: req.params.userID})
      res.status(200).json(cart)
    }catch(err){
      res.status(500).json(err)
    }
  })

  module.exports = router;