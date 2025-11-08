import { Router } from "express";
import { crearExamen, obtenerExamenes, obtenerExamenPorId, actualizarExamen, eliminarExamen } from "../controllers/examenes.controller.js";
const router = Router();

router.post("/", crearExamen);
router.get("/", obtenerExamenes);

router.get("/:id", obtenerExamenPorId);
router.put("/:id", actualizarExamen);
router.delete("/:id", eliminarExamen);

export default router;
