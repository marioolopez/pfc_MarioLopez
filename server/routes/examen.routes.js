import {Router} from "express";
import {crearExamen, obtenerExamenes, obtenerExamenPorId, actualizarExamen, eliminarExamen, resolverExamen} from "../controllers/examenes.controller.js";
const router = Router();

router.post("/", crearExamen);
router.get("/", obtenerExamenes);

router.get("/:id", obtenerExamenPorId);
router.put("/:id", actualizarExamen);
router.delete("/:id", eliminarExamen);

//ruta para que el alumno envie sus respuestas
router.post("/:id/resolver", resolverExamen);

export default router;
