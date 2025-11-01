import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Examen from "./examen.js";
import Pregunta from "./pregunta.js";

const ExamenPregunta = sequelize.define("ExamenPregunta", {
  id_examen: {type: DataTypes.INTEGER, primaryKey: true,
    references:{model: Examen, key:"id_examen"}
  },
  id_pregunta: {type: DataTypes.INTEGER,primaryKey: true,
    references: {model: Pregunta, key:"id_pregunta"}
  }
},{
  tableName: "examenes_preguntas",
  timestamps: false
});

Examen.belongsToMany(Pregunta, { 
  through: ExamenPregunta, 
  foreignKey: "id_examen",
  otherKey: "id_pregunta",
  as: "preguntas"
});

Pregunta.belongsToMany(Examen, { 
  through: ExamenPregunta,
  foreignKey: "id_pregunta",
  otherKey: "id_examen",
  as: "examenes"
});

export default ExamenPregunta;
