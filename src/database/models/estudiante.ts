import { Schema, model, Document, Types } from "mongoose";

export interface IEstudiante extends Document {
  curso_id: Types.ObjectId;
  nombre: string;
  apellido: string;
  fecha_nacimiento: Date;
  tutor_id: Types.ObjectId;
}

const EstudianteSchema = new Schema<IEstudiante>({
  curso_id: {
    type: Schema.Types.ObjectId,
    ref: "Curso",
    required: true,
  },
  nombre: String,
  apellido: String,
  fecha_nacimiento: Date,
  tutor_id: {
    type: Schema.Types.ObjectId,
    ref: "Tutor",
    required: true,
  },
});

export default model<IEstudiante>("Estudiante", EstudianteSchema);