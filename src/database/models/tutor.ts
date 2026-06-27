import { Schema, model, Document } from "mongoose";

export interface ITutor extends Document {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  direccion: string;
}

const TutorSchema = new Schema<ITutor>({
  nombre: String,
  apellido: String,
  telefono: String,
  email: String,
  direccion: String,
});

export default model<ITutor>("Tutor", TutorSchema);