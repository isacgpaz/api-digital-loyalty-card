import { model, Schema } from "mongoose";
import { IAdmin } from "../interfaces/IAdmin";
import bcrypt from "bcryptjs";

const adminSchema: Schema = new Schema({
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
  password: {
    type: String,
    required: true,
    selected: false
  }
}, { timestamps: true });

adminSchema.pre<IAdmin>('save', async function(next) {
  if(this.isModified('password') && !this.isNew) return next();

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

export default model<IAdmin>('Admin', adminSchema);