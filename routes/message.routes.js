import express from "express";

import {
  allUrl,
  crtmgsUrl,
  oneUrl,
  prtsmgsUrl,
  scktUrl,
} from "../controllers/mgs.controllers.js";

const router = express.Router();
router.get("/all", allUrl);
router.post("/one", oneUrl);
router.post("/crtmgs", crtmgsUrl);
router.post("/prtsmgs", prtsmgsUrl);
router.post("/sckturl", scktUrl);

export default router;
