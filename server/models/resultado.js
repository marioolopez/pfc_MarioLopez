import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Usuario from "./usuarios.js";
import Examen from "./examen.js";

const Resultado = sequelize.define("Resultado",{
  id_resultado: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  id_usuario: {type: DataTypes.INTEGER, allowNull: false},
  id_examen: {type: DataTypes.INTEGER, allowNull: false},
  nota: {type: DataTypes.FLOAT, allowNull: false},
  fecha_realizacion: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
},{
  tableName: "resultados",
  timestamps: false
});

Resultado.belongsTo(Usuario,{foreignKey: "id_usuario", as: "alumno"});
Resultado.belongsTo(Examen,{foreignKey: "id_examen", as: "examen"});

export default Resultado;
