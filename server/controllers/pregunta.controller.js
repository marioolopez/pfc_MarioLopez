import Pregunta from "../models/pregunta.js";

export const crearPregunta = async (req, res) => {
  try {
    const nueva = await Pregunta.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ message: "Error al crear pregunta", error });
  }
};

export const obtenerPreguntas = async (req, res) => {
  try {
    const preguntas = await Pregunta.findAll();
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener preguntas", error });
  }
};


export const obtenerPreguntasDeExamen = async (req, res) => {
  try {
    const { id_examen } = req.params;

    const examen = await Examen.findByPk(id_examen, {
      include: [{ model: Pregunta, as: "preguntas" }]
    });

    if (!examen) {
      return res.status(404).json({ message: "Examen no encontrado" });
    }

    //las preguntas vienen en examen.preguntas gracias al belongsToMany
    res.json(examen.preguntas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener preguntas del examen", error });
  }
};



export const crearPreguntaParaExamen = async (req, res) => {
  try {
    const { id_examen } = req.params;
    const { enunciado, opcionA, opcionB, opcionC, opcionD, respuesta_correcta, id_asignatura } = req.body;

    const examen = await Examen.findByPk(id_examen);
    if (!examen) {
      return res.status(404).json({ message: "Examen no encontrado" });
    }

    // 1. Creamos la pregunta (asignada a una asignatura)
    const nuevaPregunta = await Pregunta.create({
      enunciado,
      opcionA,
      opcionB,
      opcionC,
      opcionD,
      respuesta_correcta,
      id_asignatura
    });

    // 2. La asociamos al examen usando la relación Many-to-Many
    await examen.addPregunta(nuevaPregunta); // gracias a belongsToMany

    res.status(201).json(nuevaPregunta);
  } catch (error) {
    res.status(500).json({ message: "Error al crear pregunta para examen", error });
  }
};


