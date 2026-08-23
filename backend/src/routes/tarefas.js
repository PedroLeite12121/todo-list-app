import express from "express";

import {
  getTarefas,
  getTarefaById,
  getTarefaByUserID,
  createTarefa,
  updateTarefa,
  patchTarefa,
  deleteTarefa,

} from "../controllers/tarefas_controller.js";

const router = express.Router();

router.get("/", getTarefas);
router.get("/usuario", getTarefas);
router.get("/:idTarefa", getTarefaById);
router.get("/usuario/:idUsuario", getTarefaByUserID);
router.post("/", createTarefa);
router.put("/:idTarefa", updateTarefa);
router.patch("/:idTarefa", patchTarefa);
router.delete("/:idTarefa", deleteTarefa);

export default router;