import { Document } from 'mongoose';

export interface IFlag extends Document{
  isChecked: boolean;
}