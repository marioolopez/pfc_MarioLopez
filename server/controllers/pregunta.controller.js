import Pregunta from "../models/pregunta.js";
import Examen from "../models/examen.js";  

//crear pregunta 
export const crearPregunta = async (req, res) => {
  try {
    const nueva = await Pregunta.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    console.error("error al crear pregunta:", error);
    res.status(500).json({message: "error al crear la pregunta", error});
  }
};


//obtener preguntas
export const obtenerPreguntas = async (req, res) => {
  try {
    const preguntas = await Pregunta.findAll();
    res.json(preguntas);
  } catch (error) {
    console.error("Error al obtener preguntas:", error);
    res.status(500).json({message: "error al obtener preguntas", error});
  }
};


//preguntas de un examen concreto
export const obtenerPreguntasDeExamen = async (req, res) => {
  try {
    const { id_examen } = req.params;

    const examen = await Examen.findByPk(id_examen, {
      include: [{model: Pregunta, as: "preguntas"}]
    });

    if(!examen) {
      return res.status(404).json({message: "examen no encontrado"});
    }

    res.json(examen.preguntas);
  } catch (error) {
    console.error("error al obtener preguntas del examen", error);
    res.status(500).json({message: "error al obtener preguntas del examen", error});
  }
};


//crear pregunta para un examen concreto
export const crearPreguntaParaExamen = async (req, res) => {
  try {
    const { id_examen } = req.params;
    const { enunciado, opcionA, opcionB, opcionC, opcionD, respuesta_correcta, id_asignatura } = req.body;

    const examen = await Examen.findByPk(id_examen);
    if(!examen){
      return res.status(404).json({message: "no encontraste el examen"});
    }

    //1-Creamos la pregunta
    const nuevaPregunta = await Pregunta.create({
      enunciado,
      opcionA,
      opcionB,
      opcionC,
      opcionD,
      respuesta_correcta,
      id_asignatura
    });

    //2-La asociamos al examen (tabla puente)
    await examen.addPregunta(nuevaPregunta);
    res.status(201).json(nuevaPregunta);
  } catch (error) {
    console.error("error al crear pregunta para examen", error);
    res.status(500).json({message:"error al crear pregunta", error});
  }
};
