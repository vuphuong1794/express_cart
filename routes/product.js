const router = require("express").Router();
const Product = require("../models/products"); // Import Product model

router.post("/add-product", async (req, res) => {
  try {
    const { name, desc, price } = req.body;

    // Tạo sản phẩm mới
    const newProduct = new Product({
      name,
      desc,
      price,
    });

    // Lưu sản phẩm vào database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/get-products", async (req, res) => {
    try {
      // Lấy tất cả sản phẩm từ database
      const products = await Product.find();
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;