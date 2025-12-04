import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Usuario from "./usuarios.js";

const Asignatura = sequelize.define("Asignatura", {
  id_asignatura: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  nombre: {type: DataTypes.STRING(100), allowNull: false},
  descripcion: {type: DataTypes.TEXT, allowNull: true}
}, {
  tableName: "asignaturas",
  timestamps: false
});

//relación de que cada asignatura pertenece a un profesor
Asignatura.belongsTo(Usuario, {foreignKey: "id_usuario", as: "profesor"});


export default Asignatura;
