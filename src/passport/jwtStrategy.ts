import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UsuarioRepository from "../repositories/UsuarioRepository";
import { env } from "../config/env";

const usuarioRepository = new UsuarioRepository();

export default new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.authJwtSecret as string,
  },
  async (payload, done) => {
    try {
      const usuario = await usuarioRepository.getById(payload.id);

      if (!usuario) {
        return done(null, false);
      }

      if (!usuario.activo) {
        return done(null, false);
      }

      return done(null, usuario);
    } catch (error) {
      return done(error, false);
    }
  }
);