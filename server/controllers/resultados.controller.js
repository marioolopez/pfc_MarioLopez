import Resultado from "../models/resultado.js";
import Examen from "../models/examen.js";

export const obtenerResultadosDeAlumno = async (req, res) => {
  try{
    const { id_usuario } = req.params;
    const resultados = await Resultado.findAll({
      where: {id_usuario},
      include: [{model: Examen, as: "examen"}]
    });
    res.json(resultados);
  }catch(error){
    console.error("error", error);
    res.status(500).json({ message: "error", error });
  }
};
