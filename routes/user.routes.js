import express from "express";
import {
  signupUrl,
  loginUrl,
  registrationUrl,
  valUrl,
  signupgUrl,
  ctokenUrl,
  qryusrUrl,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/signup", signupUrl);
router.get("/sgnpg", signupgUrl);
router.get("/login", loginUrl);
router.post("/registration", registrationUrl);
router.post("/verificaftion", valUrl);
router.post("/ctoken", ctokenUrl);
router.post("/qryusr", qryusrUrl);
export default router;
