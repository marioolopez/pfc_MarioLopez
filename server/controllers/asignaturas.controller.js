import Asignatura from "../models/asignatura.js";
import Usuario from "../models/usuarios.js";

// 📍 Crear una nueva asignatura
export const crearAsignatura = async (req, res) => {
  try {
    const { nombre, descripcion, id_usuario } = req.body;

    if (!nombre || !id_usuario) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const nueva = await Asignatura.create({ nombre, descripcion, id_usuario });
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ message: "Error al crear asignatura", error });
  }
};

// 📍 Obtener todas las asignaturas
export const obtenerAsignaturas = async (req, res) => {
  try {
    const asignaturas = await Asignatura.findAll({
      include: [{ model: Usuario, as: "profesor" }]
    });
    res.json(asignaturas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener asignaturas", error });
  }
};

// 📍 Obtener una asignatura por ID
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
    res.status(500).json({ message: "Error al obtener la asignatura", error });
  }
};

// 📍 Actualizar una asignatura
export const actualizarAsignatura = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const asignatura = await Asignatura.findByPk(id);
    if (!asignatura) {
      return res.status(404).json({ message: "Asignatura no encontrada" });
    }

    asignatura.nombre = nombre || asignatura.nombre;
    asignatura.descripcion = descripcion || asignatura.descripcion;

    await asignatura.save();
    res.json({ message: "Asignatura actualizada correctamente", asignatura });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar asignatura", error });
  }
};

// 📍 Eliminar una asignatura
export const eliminarAsignatura = async (req, res) => {
  try {
    const { id } = req.params;
    const asignatura = await Asignatura.findByPk(id);
    if (!asignatura) {
      return res.status(404).json({ message: "Asignatura no encontrada" });
    }

    await asignatura.destroy();
    res.json({ message: "Asignatura eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar asignatura", error });
  }
};
