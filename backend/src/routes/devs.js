import express from "express";

import {
  getDevs,
  getDevById,
  createDev,
  updateDev,
  patchDev,
  deleteDev
} from "../controllers/devs_controller.js";

const router = express.Router();

router.get("/", getDevs);
router.get("/:idDev", getDevById);
router.post("/", createDev);
router.put("/:idDev", updateDev);
router.patch("/:idDev", patchDev);
router.delete("/:idDev", deleteDev);

export default router;