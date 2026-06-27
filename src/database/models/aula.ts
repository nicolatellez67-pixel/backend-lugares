import { Schema, model, Document } from "mongoose";

export interface IAula extends Document {
  nombre: string;
  ubicacion: string;
  capacidad: number;
}

const AulaSchema = new Schema<IAula>({
  nombre: {
    type: String,
    required: true,
  },
  ubicacion: {
    type: String,
    required: true,
  },
  capacidad: {
    type: Number,
    required: true,
  },
});

export default model<IAula>("Aula", AulaSchema);