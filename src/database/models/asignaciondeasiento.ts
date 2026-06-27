import { Schema, model, Document, Types } from "mongoose";

export interface IAsignacionAsiento extends Document {
  estudiante_id: Types.ObjectId;
  asiento_id: Types.ObjectId;
  fecha_asignacion: Date;
  fecha_fin?: Date;
}

const AsignacionAsientoSchema = new Schema<IAsignacionAsiento>({
  estudiante_id: {
    type: Schema.Types.ObjectId,
    ref: "Estudiante",
    required: true,
  },
  asiento_id: {
    type: Schema.Types.ObjectId,
    ref: "Asiento",
    required: true,
  },
  fecha_asignacion: {
    type: Date,
    required: true,
  },
  fecha_fin: {
    type: Date,
  },
});

export default model<IAsignacionAsiento>(
  "AsignacionAsiento",
  AsignacionAsientoSchema
);