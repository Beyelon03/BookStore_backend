import { ObjectId } from 'mongoose';

export interface IToken {
  user: ObjectId;
  refreshToken: string;
}
