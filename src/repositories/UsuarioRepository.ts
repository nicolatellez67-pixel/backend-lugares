import Usuario from "../database/models/usuario";
import bcrypt from "bcrypt";

export default class UsuarioRepository {
  // Obtener usuario por ID
  async getById(id: string) {
    return await Usuario.findById(id).select("-password");
  }

  // Obtener usuario para login usando email
  async getAuthByEmail(email: string) {
    return await Usuario.findOne({ email }).select("+password");
  }

  // Comparar contraseña
  async comparePassword(plain: string, hash: string) {
    return await bcrypt.compare(plain, hash);
  }

  // Crear usuario
  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await Usuario.create({
      nombre: data.nombre,
      email: data.email,
      password: hashedPassword,
      rol: data.rol,
      activo: data.activo ?? true,
    });
  }

  // Obtener todos los usuarios
  async getAll() {
    return await Usuario.find().select("-password");
  }

  // Actualizar usuario
  async update(id: string, data: any) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await Usuario.findByIdAndUpdate(id, data, {
      new: true,
    }).select("-password");
  }

  // Eliminar usuario
  async delete(id: string) {
    return await Usuario.findByIdAndDelete(id);
  }
}