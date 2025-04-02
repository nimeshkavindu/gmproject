import express from "express";
import cors from "cors";
import { sequelize } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import 'dotenv/config';

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Validate environment variables
if (!process.env.DB_NAME || !process.env.DB_USER) {
  console.error("Missing database configuration in .env");
  process.exit(1);
}

// Middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));
app.use("/images", express.static("uploads"));

// Sync Database
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database Synced");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Database sync error:", err);
  });

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/food", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => res.send("API Working"));