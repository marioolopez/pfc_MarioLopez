import {DataTypes} from "sequelize";
import sequelize from "../database.js";

const Usuario = sequelize.define("Usuario", {
  id_usuario: {type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true,},
  nombre: {type: DataTypes.STRING(100),allowNull: false,},
  email: {type: DataTypes.STRING(100),allowNull: false,unique: true,},
  contrasena: {type: DataTypes.STRING(100),allowNull: false,},
  rol: {type: DataTypes.ENUM("admin", "profesor", "alumno"),allowNull: false,}, //allow hace que la columna no este vacia
},{
  tableName: "usuarios", //nombre de la tabla en MySQL
  timestamps: false //desactiva duplicados
});

export default Usuario;