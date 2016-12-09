import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Shred Schema
 */
const ShredSchema = new mongoose.Schema({
  /*shredId: {
    type: Number,
    required: true
  },*/
  ownerId: {
    type: ObjectId,
    ref : 'User',
    required: true
  },

  shredSize: {    //Shred size in Mb
    type: Number,
    required: true
  }
});

/**
 * Methods
 */
ShredSchema.method({

});

/**
 * Statics
 */
ShredSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((shred) => {
        if (shred) {
          return shred;
        }
        const err = new APIError('No such shred exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
};

export default mongoose.model('Shred', SchredSchema);
