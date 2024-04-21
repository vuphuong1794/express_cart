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
  
    try {
      const cart = await Cart.findOne({userId})
       // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    if (cart) {
      const productExists = cart.products.find(p => p.productId === product.productId);

      if (productExists) {
        // Tìm chỉ mục của sản phẩm trong mảng products
        const productIndex = cart.products.findIndex(p => p.productId === product.productId);
      
        // Cập nhật số lượng sản phẩm
        cart.products[productIndex].quantity += product.quantity;
      
        // Lưu giỏ hàng đã cập nhật
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng hiện tại
        cart.products.push(product);
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
      }
    }
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