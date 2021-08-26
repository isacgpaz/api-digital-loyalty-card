import { model, Schema } from "mongoose";
import { IFlag } from "../interfaces/IFlag";

const flagSchema: Schema = new Schema({
  isChecked: {
    type: Boolean,
    default: false,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default model<IFlag>('Flag', flagSchema);