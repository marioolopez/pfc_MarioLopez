import { Router } from "express";
import { crearPregunta, obtenerPreguntas, obtenerPreguntasDeExamen, crearPreguntaParaExamen, actualizarPregunta, eliminarPregunta} from "../controllers/pregunta.controller.js";
const router = Router();

router.post("/", crearPregunta);
router.get("/", obtenerPreguntas);

//preg de un examen
router.get("/examen/:id_examen", obtenerPreguntasDeExamen);
router.post("/examen/:id_examen", crearPreguntaParaExamen);

//nuevas rutas para crud completo
router.put("/:id", actualizarPregunta);
router.delete("/:id", eliminarPregunta);

export default router;