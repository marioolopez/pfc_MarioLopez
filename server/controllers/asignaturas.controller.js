import Asignatura from "../models/asignatura.js";
import Usuario from "../models/usuarios.js";
import Examen from "../models/examen.js";
import Pregunta from "../models/pregunta.js";
import ExamenPregunta from "../models/examenPregunta.js";

//crear asignatura
export const crearAsignatura = async (req, res) => {
  try {
    const { nombre, descripcion, id_usuario } = req.body;

    if(!nombre || !id_usuario) {
      return res.status(400).json({message: "faltan datos obligatorios"});
    }

    const nueva = await Asignatura.create({ nombre, descripcion, id_usuario });
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};

//obtener todas las asignaturas
export const obtenerAsignaturas = async (req, res) => {
  try {
    const asignaturas = await Asignatura.findAll({
      include: [{ model: Usuario, as: "profesor" }]
    });
    res.json(asignaturas);
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};

//obtener una asignatura por ID
export const obtenerAsignaturaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const asignatura = await Asignatura.findByPk(id, {
      include: [{ model: Usuario, as: "profesor" }]
    });

    if (!asignatura) {
      return res.status(404).json({ message: "Asignatura no encontrada" });
    }

    res.json(asignatura);
  } catch (error) {
    res.status(500).json({message: "error", error});
  }
};


//actualizar asignatura
export const actualizarAsignatura = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const asignatura = await Asignatura.findByPk(id);
    if(!asignatura){
      return res.status(404).json({message: "no se encontro la asig" });
    }

    asignatura.nombre = nombre || asignatura.nombre;
    asignatura.descripcion = descripcion || asignatura.descripcion;

    await asignatura.save();
    res.json({message: "asignatura actualizada", asignatura});
  } catch (error) {
    res.status(500).json({message: "error", error});
  }
};


//eliminar asignatura
export const eliminarAsignatura = async (req, res) => {
  try {
    const { id } = req.params;
    const asignatura = await Asignatura.findByPk(id);
    if(!asignatura){
      return res.status(404).json({message: "asignatura no encontrada"});
    }

    //buscar los examenes de esa asignatura
    const examenes = await Examen.findAll({
      where: {id_asignatura: id}
    });


    //para cada examen borrar sus preguntas y relaciones
    for(const examen of examenes){
      const relaciones = await ExamenPregunta.findAll({
        where: { id_examen: examen.id_examen }
      });

      for(const rel of relaciones){
        await Pregunta.destroy({where: {id_pregunta: rel.id_pregunta}});
      }

      await ExamenPregunta.destroy({where: {id_examen: examen.id_examen}});

      await examen.destroy();
    }
    
    await asignatura.destroy();
    res.json({message: "aignatura eliminada"});

  }catch (error){
    res.status(500).json({message: "error", error});
  }
};
