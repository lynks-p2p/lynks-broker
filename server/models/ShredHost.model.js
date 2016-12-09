import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * ShredHost Schema
 */
const ShredHostSchema = new mongoose.Schema({

  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required: true,
  },

  shredId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Shred',
    required: true,
  }
});

/**
 * Methods
 */
ShredHostSchema.method({

});

/**
 * Statics
 */
ShredHostSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((shredHost) => {
        if (shredHost) {
          return shredHost;
        }
        const err = new APIError('No such shredHost exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
};

export default mongoose.model('ShredHost', ShredHostSchema);
