import Usuario from "../models/usuarios.js";

//registro usuario
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, contrasena, rol } = req.body;

    if(!nombre || !email || !contrasena){
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if(contrasena.length < 5){
      return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if(usuarioExistente){
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    //creo usu dsps de validacion
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      contrasena,
      rol: rol || "alumno"
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};






//login usuario
export const loginUsuario = async (req, res) => {
  try{
    const { email, contrasena } = req.body;

    //buscar por email
    const usuario = await Usuario.findOne({where: {email}});
    if(!usuario){
      return res.status(404).json({message:"Usuario no encontrado"});
    }

    //comprobar contraseña
    if(usuario.contrasena !== contrasena){
      return res.status(401).json({message:"Contraseña incorrecta"});
    }

    res.json({
      message: "login exitoso",
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error en login", error });
  }
};




//obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};





//obtener usuario por id
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
};





//actualizar usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, contrasena, rol } = req.body;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    usuario.nombre = nombre || usuario.nombre;
    usuario.email = email || usuario.email;
    usuario.contrasena = contrasena || usuario.contrasena;
    usuario.rol = rol || usuario.rol;

    await usuario.save();
    res.json({ message: "Usuario actualizado correctamente", usuario });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};






//eliminar usuario
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await usuario.destroy();
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
};