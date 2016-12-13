// import Promise from 'bluebird';
import mongoose from 'mongoose';
// import httpStatus from 'http-status';
// import APIError from '../helpers/APIError';

/**
 * ShredHost Schema
 */
const ShredHostSchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required: true,
  },
  shred: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Shred',
    required: true,
  }
});

/**
 * Methods
 */
// ShredHostSchema.methodName = () => {
//
// };

/**
 * Statics
 */
// ShredHostSchema.statics.get = (id) => {
//   return this.findById(id)
//     .exec()
//     .then((shredHost) => {
//       if (shredHost) {
//         return shredHost;
//       }
//       const err = new APIError('No such shredHost exists!', httpStatus.NOT_FOUND);
//       return Promise.reject(err);
//     });
// };

export default mongoose.model('ShredHost', ShredHostSchema);
