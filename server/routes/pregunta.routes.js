import { Router } from "express";
import { crearPregunta, obtenerPreguntas } from "../controllers/pregunta.controller.js";

const router = Router();

//crear una nueva pregunta
router.post("/", crearPregunta);

//obtener todas las preguntas
router.get("/", obtenerPreguntas);

export default router;
