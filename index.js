const express = require('express');
const mongoose = require('mongoose');
const cartRoute = require("./routes/cart")
const cookieParser = require("cookie-parser")
const authRoute = require("./routes/auth")
const dotenv = require("dotenv")
const cors = require("cors")
const productRoute = require("./routes/product")
const userRoute = require("./routes/user")

dotenv.config();

const app = express();

// Kết nối MongoDB
const connect = async () => {
    try {
      await mongoose.connect("mongodb+srv://pvunguyen84:L4OvlWVheaAHvROt@cluster0.3twqzek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
      console.log("connected to database");
    } catch (err) {
      throw err;
    }
  };
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });
  
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

app.use("/v1/auth", authRoute)
app.use("/v1/carts", cartRoute)
app.use("/v1/product", productRoute)
app.use("/v1/user", userRoute)

// Kết nối cổng và bắt đầu server
const PORT =  8000;
app.listen(PORT, () => {
    connect();
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
