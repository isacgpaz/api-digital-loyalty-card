import { Document, Schema } from 'mongoose';

export interface IFlag extends Document{
  isChecked: boolean;
  index: number;
}