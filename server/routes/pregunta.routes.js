import { Router } from "express";
import { crearPregunta, obtenerPreguntas, obtenerPreguntasDeExamen, crearPreguntaParaExamen } from "../controllers/pregunta.controller.js";
const router = Router();

router.post("/", crearPregunta);
router.get("/", obtenerPreguntas);

//preg de un examen
router.get("/examen/:id_examen", obtenerPreguntasDeExamen);
router.post("/examen/:id_examen", crearPreguntaParaExamen);

export default router;
