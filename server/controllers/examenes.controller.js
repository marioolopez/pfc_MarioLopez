import Examen from "../models/examen.js";
import Asignatura from "../models/asignatura.js";
import Usuario from "../models/usuarios.js";

export const crearExamen = async (req, res) => {
  try {
    const { titulo, id_asignatura, id_usuario } = req.body;
    const nuevo = await Examen.create({ titulo, id_asignatura, id_usuario });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear examen", error });
  }
};

export const obtenerExamenes = async (req, res) => {
  try {
    const examenes = await Examen.findAll({
      include: [
        { model: Asignatura, as: "asignatura" },
        { model: Usuario, as: "profesor" }
      ]
    });
    res.json(examenes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener examenes", error });
  }
};
