import { Router } from "express";
import { obtenerResultadosDeAlumno } from "../controllers/resultados.controller.js";

const router = Router();

router.get("/alumno/:id_usuario", obtenerResultadosDeAlumno);

export default router;
