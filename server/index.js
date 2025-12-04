import dotenv from "dotenv";
dotenv.config(); //primero, antes de importar nada más, para enviar los datos de la conexion y realizar la configuracion para conectarte
import express from "express";
import cors from "cors";
import sequelize from "./database.js";

//activar las relaciones many to many
import "./models/examenPregunta.js";

//rutas para poder utilizar
import usuarioRoutes from "./routes/usuario.routes.js";
import examenRoutes from "./routes/examen.routes.js";
import preguntaRoutes from "./routes/pregunta.routes.js";
import asignaturaRoutes from "./routes/asignatura.routes.js";
import resultadoRoutes from "./routes/resultado.routes.js";

//inicializo dependecias
const app = express();
app.use(cors());
app.use(express.json());

//defino rutas antes de usar
app.use("/api/usu", usuarioRoutes); //ruta de usuarios
app.use("/api/examenes", examenRoutes); //ruta de examenes
app.use("/api/preguntas", preguntaRoutes); //ruta de preguntas
app.use("/api/asignaturas", asignaturaRoutes); //ruta de asignaturas
app.use("/api/resultados", resultadoRoutes); //ruta de resultados

//conexion
const PORT = process.env.PORT || 4000;
(async () => {
  try {
    console.log("DB CONFIG:", process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS);
    await sequelize.authenticate();
    console.log("Conectado a MySQL");
    await sequelize.sync();
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Error en DB:", err);
  }
})();

