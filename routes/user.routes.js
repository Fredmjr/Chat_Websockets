import express from "express";
import { signupUrl, loginUrl } from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/signup", signupUrl);
router.get("/login", loginUrl);

export default router;
