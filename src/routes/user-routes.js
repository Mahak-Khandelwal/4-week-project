import express from "express";
import {
  createProduct,
  deleteProductById,
  deleteProducts,
  deleteUser,
  getAUserById,
  getProducts,
  getUsers,
  login,
  signup,
  updateProductById,
  updateProducts,
  updateProfilePicture,
} from "../controllers/user-controller.js";
import authMiddleware from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/users", getUsers);

router.get("/me", authMiddleware, getAUserById);

router.post("/user", signup);

router.post("/login", login);

router.delete("/delete/user", deleteUser);

router.post(
  "/profile/picture",
  authMiddleware,
  upload.single("avatar"),
  updateProfilePicture,
);

//Product routes

router.post("/create", createProduct);

router.get("/get", getProducts);

router.put("/update", updateProducts);

router.put("/update/:id", updateProductById);

router.delete("/delete/:id", deleteProductById);

router.delete("/delete/products", deleteProducts);

export default router;
