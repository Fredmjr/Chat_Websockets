import express from "express";
import {
  signupUrl,
  loginUrl,
  registrationUrl,
  valUrl,
  signupgUrl,
  ctokenUrl,
  qryusrUrl,
  srchpgUrl,
  qrysrchusrUrl,
  srchusrchtUrl,
  mgsprtUrl,
  autlgUrl,
  dtlusrUrl,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/signup", signupUrl);
router.get("/sgnpg", signupgUrl);
router.get("/login", loginUrl);
router.post("/registration", registrationUrl);
router.post("/verificaftion", valUrl);
router.post("/ctoken", ctokenUrl);
router.post("/qryusr", qryusrUrl);
router.get("/qrysrchpg", srchpgUrl);
router.get("/qrysrchusr/:userport", qrysrchusrUrl);
router.get("/srchusrcht", srchusrchtUrl);
router.post("/mgsprt", mgsprtUrl);
router.post("/autlg", autlgUrl);
router.delete("/dtlusr/:prt", dtlusrUrl);

export default router;
