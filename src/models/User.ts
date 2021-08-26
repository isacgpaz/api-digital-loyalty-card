import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  imageUrl: {
    type: String
  },
  flags: [{
    type: Schema.Types.ObjectId,
    ref: 'Flag',
    default: [15]
  }]
}, { timestamps: true });

export default model<IUser>('User', userSchema);