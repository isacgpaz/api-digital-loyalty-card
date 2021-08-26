import { model, Schema } from "mongoose";
import { IFlag } from "../interfaces/IFlag";

const flagSchema: Schema = new Schema({
  isChecked: {
    type: Boolean,
    required: true
  },
}, { timestamps: true });

export default model<IFlag>('Flag', flagSchema);