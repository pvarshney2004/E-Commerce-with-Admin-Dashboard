import express from "express";
import cors from "cors";
import "dotenv/config";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import connectToDB from "./config/db.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());
connectToDB();
connectCloudinary()

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter)

app.get("/", (req, res) => {
  res.send("API Working in index.js");
});

app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
