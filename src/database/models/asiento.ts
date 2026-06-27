import { Schema, model, Document, Types } from "mongoose";

export interface IAsiento extends Document {
  aula_id: Types.ObjectId;
  numero: number;
  fila: number;
  columna: number;
}

const AsientoSchema = new Schema<IAsiento>({
  aula_id: {
    type: Schema.Types.ObjectId,
    ref: "Aula",
    required: true,
  },
  numero: Number,
  fila: Number,
  columna: Number,
});

export default model<IAsiento>("Asiento", AsientoSchema);