import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser
} from "../controllers/usuarios_controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:idUsuario", getUserById);
router.post("/", createUser);
router.put("/:idUsuario", updateUser);
router.patch("/:idUsuario", patchUser);
router.delete("/:idUsuario", deleteUser);

export default router;