import { Router } from "express";
import {crearAsignatura,obtenerAsignaturas,obtenerAsignaturaPorId,actualizarAsignatura,eliminarAsignatura} from "../controllers/asignaturas.controller.js";

const router = Router();

router.post("/", crearAsignatura);  //crear
router.get("/", obtenerAsignaturas);   //listar
router.get("/:id", obtenerAsignaturaPorId);//obtener por id
router.put("/:id", actualizarAsignatura);  //actualizar
router.delete("/:id", eliminarAsignatura); //eliminar

export default router;