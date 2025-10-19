import dotenv from "dotenv";
dotenv.config(); //primero, antes de importar nada más, para enviar los datos de la conexion y realizar la configuracion para conectarte
import express from "express";
import cors from "cors";
import sequelize from "./database.js";
import usuarioRoutes from "./routes/usuario.routes.js";

//inicializo dependecias
const app = express();
app.use(cors());
app.use(express.json());

//defino rutas antes de usar
app.use("/api/usu", usuarioRoutes); //ruta de usuarios

//conexion
const PORT = process.env.PORT || 4000;
(async () => {
  try {
    console.log("DB CONFIG:", process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS);
    await sequelize.authenticate();
    console.log("✅ Conectado a MySQL");
    await sequelize.sync();
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Error en DB:", err);
  }
})();

