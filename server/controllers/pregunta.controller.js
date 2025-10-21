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
