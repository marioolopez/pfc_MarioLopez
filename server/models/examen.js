import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Asignatura from "./asignatura.js";
import Usuario from "./usuarios.js";

const Examen = sequelize.define("Examen", {
  id_examen: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  titulo: { type: DataTypes.STRING(100), allowNull: false },
  fechaCreacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "examenes",
  timestamps: false
});

Examen.belongsTo(Asignatura, { foreignKey: "id_asignatura", as: "asignatura" }); //saber a que asignatura pertenece
Examen.belongsTo(Usuario, { foreignKey: "id_usuario", as: "profesor" }); //que usuario (en este caso profesor) a creado el examen

export default Examen;
