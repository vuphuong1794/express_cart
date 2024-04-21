const mongoose = require("mongoose")

// Tạo schema cho sản phẩm
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    des: String
  },{timestamps: true});
  
  // Tạo model cho sản phẩm
module.exports = mongoose.model('Product', ProductSchema);