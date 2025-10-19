import { Router } from "express";
import { registrarUsuario, loginUsuario, obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario } from "../controllers/usuarios.controller.js";
const router = Router();

//rutas
router.post("/registro", registrarUsuario);
router.post("/login", loginUsuario);

//para el crud de panelAdmin
router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuarioPorId);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;