import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    require: true
  },
  name: {
    type: String
  }
}, { collection: 'user', versionKey: false});

export default model('user', UserSchema);