import { Schema, model } from 'mongoose';

const DailyUploadSchema = new Schema({
  uploadId: {
    type: String,
    unique: true,
    require: true
  },
  name: {
    type: String
  },
  uploadTime: {
      type: String
  },
  imgUrl: {
      type: String
  }
}, { collection: 'dailyUpload', versionKey: false});

export default model('dailyUpload', DailyUploadSchema);