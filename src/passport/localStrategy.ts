import { Strategy as LocalStrategy } from "passport-local";
import UsuarioRepository from "../repositories/UsuarioRepository";

const usuarioRepository = new UsuarioRepository();

export default new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      console.log("Email recibido:", email);

      const usuario = await usuarioRepository.getAuthByEmail(email);

      console.log("Usuario encontrado:", usuario);

      if (!usuario) {
        return done(null, false, { message: "Usuario no encontrado" });
      }

      const isValidPassword = await usuarioRepository.comparePassword(
        password,
        usuario.password
      );

      console.log("Password válida:", isValidPassword);

      if (!isValidPassword) {
        return done(null, false, { message: "Contraseña incorrecta" });
      }

      if (!usuario.activo) {
        return done(null, false, { message: "Usuario inactivo" });
      }

      return done(null, usuario);
    } catch (error) {
      console.log(error);
      return done(error);
    }
  }
);