import express from "express";
import { getAUserById, getUsers, login, signup } from "../controllers/user-controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/users", getUsers);

router.get("/me", authMiddleware, getAUserById);

router.post("/user", signup);

router.post("/login",login)

export default router;
