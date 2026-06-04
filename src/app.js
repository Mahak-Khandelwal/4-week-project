import "dotenv/config";
import express from "express";
import userRoutes from "./routes/user-routes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000/" }));

app.use("/api", userRoutes);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
