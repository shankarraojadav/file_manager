import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import UserRoutes from "./src/routes/userRoutes.js";
import fileRoutes from "./src/routes/fileRoutes.js";
import sequelize from "./src/models/db.js";

dotenv.config();

const port = process.env.PORT || 3000;



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("", UserRoutes);

app.listen(port, () => {
    console.log("server started", port)
})

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });