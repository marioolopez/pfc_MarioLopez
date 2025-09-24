import dotenv from "dotenv";
dotenv.config();//👈 primero, antes de importar nada más
console.log("ENV:", process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS);


import express from "express";
import cors from "cors";
import sequelize from "./database.js";
import usuarioRoutes from "./routes/usuario.routes.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", usuarioRoutes); //ruta de usuarios



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

