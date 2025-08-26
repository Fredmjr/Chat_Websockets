import express from "express";
import {
  signupUrl,
  loginUrl,
  valUrl,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/signup", signupUrl);
router.get("/login", loginUrl);
router.get("/verification", valUrl);

export default router;
