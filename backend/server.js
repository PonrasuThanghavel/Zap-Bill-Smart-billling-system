const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/inventoryroutes");
const adminloginroute = require("./routes/adminroutes");
const storeroute = require("./routes/storeRoutes");
const userroute = require("./routes/userroutes");

// Load environment variables from `env/.env`
dotenv.config({ path: ".env" });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use("/api/products", productRoutes);
app.use("/api/adminlogin/test", adminloginroute);
app.use("/api/v1/stores", storeroute);
app.use("/api/v1/user", userroute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
