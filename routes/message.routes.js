import express from "express";

import { allUrl, crtmgsUrl, oneUrl } from "../controllers/mgs.controllers.js";

const router = express.Router();
router.get("/all", allUrl);
router.post("/one", oneUrl);
router.post("/crtmgs", crtmgsUrl);

export default router;
