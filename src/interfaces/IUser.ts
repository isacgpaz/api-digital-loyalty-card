import { Document } from 'mongoose';
import { IFlag } from './IFlag';

export interface IUser extends Document{
  name: string,
  email: string;
  imageUrl: string;
  flags: Array<IFlag>
}