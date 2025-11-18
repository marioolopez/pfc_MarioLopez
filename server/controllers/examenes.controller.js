import Examen from "../models/examen.js";
import Asignatura from "../models/asignatura.js";
import Usuario from "../models/usuarios.js";
import Pregunta from "../models/pregunta.js";
import ExamenPregunta from "../models/examenPregunta.js";

//crear examen
export const crearExamen = async (req, res) => {
  try {
    const { titulo, id_asignatura, id_usuario } = req.body;
    const nuevo = await Examen.create({ titulo, id_asignatura, id_usuario });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({message: "errror", error});
  }
};


//obtener examenes
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
    res.status(500).json({message: "Error al obtener examenes", error});
  }
};


//obtener un examen por id
export const obtenerExamenPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const examen = await Examen.findByPk(id, {
      include: [
        { model: Asignatura, as: "asignatura" },
        { model: Usuario, as: "profesor" }
      ]
    });

    if(!examen) {
      return res.status(404).json({message: "Examen no encontrado"});
    }

    res.json(examen);
  } catch (error) {
    res.status(500).json({message: "Error al obtener examen", error});
  }
};


//actualizar
export const actualizarExamen = async (req, res) => {
  try{
    const { id } = req.params;
    const { titulo } = req.body;

    const examen = await Examen.findByPk(id);
    if(!examen){
      return res.status(404).json({message: "no se encontro el examen"});
    }

    examen.titulo = titulo || examen.titulo;
    await examen.save();

    res.json({ message: "examen actualizado", examen });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};


//eliminar examen
export const eliminarExamen = async (req, res) => {
  try {
    const { id } = req.params;

    const examen = await Examen.findByPk(id);
    if(!examen){
      return res.status(404).json({message: "examen no encontrado"});
    }

    //busca relacion en table puente
    const relaciones = await ExamenPregunta.findAll({
      where: {id_examen: id}
    });

    //borrar las preguntas asociadas a esas relaciones
    for(const rel of relaciones) {
      await Pregunta.destroy({where: {id_pregunta: rel.id_pregunta}});
    }

    //borrar las filas de la tabla puente
    await ExamenPregunta.destroy({where: {id_examen: id}});

    //borra el examen
    await examen.destroy();
    res.json({message: "examen eliminado"});
  } catch (error) {
    res.status(500).json({message: "error", error});
  }
};

