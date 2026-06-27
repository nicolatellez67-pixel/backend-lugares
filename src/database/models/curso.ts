import { Schema, model, Document, Types } from "mongoose";

export interface ICurso extends Document {
  nombre: string;
  nivel: string;
  aula_id: Types.ObjectId;
}

const CursoSchema = new Schema<ICurso>({
  nombre: {
    type: String,
    required: true,
  },
  nivel: {
    type: String,
    required: true,
  },
  aula_id: {
    type: Schema.Types.ObjectId,
    ref: "Aula",
    required: true,
  },
});

export default model<ICurso>("Curso", CursoSchema);