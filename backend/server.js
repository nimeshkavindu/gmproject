import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import 'dotenv/config';

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/images", express.static("uploads"));

// Sync Database
sequelize.sync({ alter: true }).then(() => console.log("Database Synced"));

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/food", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => res.send("API Working"));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
