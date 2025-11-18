import { Sequelize } from "sequelize";
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);
export default sequelize;


























/*
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS examenes_preguntas;
DROP TABLE IF EXISTS resultados;
DROP TABLE IF EXISTS preguntas;
DROP TABLE IF EXISTS examenes;
DROP TABLE IF EXISTS asignaturas;
DROP TABLE IF EXISTS usuarios;

SET FOREIGN_KEY_CHECKS = 1;
*/