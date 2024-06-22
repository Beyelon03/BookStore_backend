import mongoose, { Model, Schema } from 'mongoose';
import { IToken } from '../interfaces/IToken';

const TokenSchema: Schema<IToken> = new Schema<IToken>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const TokenModel: Model<IToken> = mongoose.model<IToken>('Token', TokenSchema, 'tokens');

export default TokenModel;
