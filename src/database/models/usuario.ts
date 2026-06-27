import { Schema, model, Document } from "mongoose";

export interface IUsuario extends Document {
  nombre: string;
  email: string;
  password: string;
  rol: "ADMIN" | "DOCENTE" | "TUTOR";
  activo: boolean;
}

const UsuarioSchema = new Schema<IUsuario>(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      enum: ["ADMIN", "DOCENTE", "TUTOR"],
      default: "DOCENTE",
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IUsuario>("Usuario", UsuarioSchema);