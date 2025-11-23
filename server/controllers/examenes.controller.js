import Examen from "../models/examen.js";
import Asignatura from "../models/asignatura.js";
import Usuario from "../models/usuarios.js";
import Pregunta from "../models/pregunta.js";
import ExamenPregunta from "../models/examenPregunta.js";
import Resultado from "../models/resultado.js";


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
        {model: Asignatura, as: "asignatura"},
        {model: Usuario, as: "profesor"}
      ]
    });
    res.json(examenes);
  } catch (error) {
    res.status(500).json({message: "error al obtener examenes", error});
  }
};


//obtener un examen por id
export const obtenerExamenPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const examen = await Examen.findByPk(id, {
      include: [ //añade automaticamente, muy útil
        {model: Asignatura, as: "asignatura"},
        {model: Usuario, as: "profesor"}
      ]
    });

    if(!examen){
      return res.status(404).json({message: "Examen no encontrado"});
    }

    res.json(examen);
  } catch (error) {
    res.status(500).json({message: "error", error});
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




//resolver un examen (el alumno lo hace, se corrige y se guarda la nota)
export const resolverExamen = async (req, res) => {
  try{
    const { id } = req.params; //id del examen
    const { id_usuario, respuestas } = req.body;

    //traer el examen con sus preguntas asociadas
    const examen = await Examen.findByPk(id, {
      include: [{ model: Pregunta, as: "preguntas"}]
    });

    if(!examen) {
      return res.status(404).json({message: "no se encontro el examn"});
    }

    if(!Array.isArray(respuestas) || respuestas.length === 0){
      return res.status(400).json({message: "no se enviaron respuestas"});
    }

    //corregir
    let correctas = 0;
    const total = examen.preguntas.length;

    examen.preguntas.forEach((preg) => {
      const r = respuestas.find(
        (resp) => resp.id_pregunta === preg.id_pregunta
      );
      if(!r) return;

      const respUsuario = (r.respuesta_usuario || "").toUpperCase();
      const respCorrecta = (preg.respuesta_correcta || "").toUpperCase();

      if(respUsuario === respCorrecta) {
        correctas++;
      }
    });

    const nota = total > 0 ? (correctas / total) * 10 : 0;

    //guardar en la tabla resultados
    const resultado = await Resultado.create({
      id_usuario,
      id_examen: examen.id_examen,
      nota
    });

    //devolver resumen al frontend
    res.json({
      message: "examen corregido",
      nota,
      correctas,
      total,
      resultado
    });
  }catch(error){
    console.error("error", error);
    res.status(500).json({message: "error", error});
  }
};


