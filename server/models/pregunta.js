import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Asignatura from "./asignatura.js";

const Pregunta = sequelize.define("Pregunta", {
  id_pregunta: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  enunciado: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  opcionA: DataTypes.STRING(255),
  opcionB: DataTypes.STRING(255),
  opcionC: DataTypes.STRING(255),
  opcionD: DataTypes.STRING(255),
  respuesta_correcta: {
    type: DataTypes.STRING(1),
    allowNull: false
  }
}, {
  tableName: "preguntas",
  timestamps: false
});

Pregunta.belongsTo(Asignatura, { foreignKey: "id_asignatura", as: "asignatura" });

export default Pregunta;
