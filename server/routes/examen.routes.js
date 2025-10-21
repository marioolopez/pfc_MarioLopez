import { Router } from "express";
import { crearExamen, obtenerExamenes } from "../controllers/examenes.controller.js";
const router = Router();

router.post("/", crearExamen);
router.get("/", obtenerExamenes);

export default router;
