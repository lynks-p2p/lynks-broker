import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Shred Schema
 */
const ShredSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required: true
  },
  // Shred size in Bytes
  size: {
    type: Number,
    required: true
  }
});

/**
 * Methods
 */
ShredSchema.methods.methodName = () => {

};

/**
 * Statics
 */
ShredSchema.statics.get  = (id) => {
  return this.findById(id)
    .exec()
    .then((shred) => {
      if (shred) {
        return shred;
      }
      const err = new APIError('No such shred exists!', httpStatus.NOT_FOUND);
      return Promise.reject(err);
    });
};

export default mongoose.model('Shred', ShredSchema);
