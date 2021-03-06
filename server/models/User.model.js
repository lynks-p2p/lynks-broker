// import Promise from 'bluebird';
import mongoose from 'mongoose';
// import SHA1 from 'crypto-js/sha1';
// import httpStatus from 'http-status';
// import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  networkID: {
    type: String,
    required: true,
    unique: true
  },
  fileMap: {
    type: Buffer,
    required: true
  }
});

/**
 * Methods
 */
// UserSchema.methods.methodName = () => {
//
// };

/**
 * Statics
 */
// UserSchema.statics.get = (userId) => {
//   return this.findOne({_id: userId})
//     .exec()
//     .then((user) => {
//       if (user) {
//         return user;
//       }
//       const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
//       return Promise.reject(err);
//     });
// };
//
// UserSchema.statics.remove = (userId) => {
//   return this.findOneaAndRemove({_id: userId})
//     .exec();
// };

// we assume that it is possible to save here -- double check?
// UserSchema.statics.updateCap = (userId, capacity) => {
//   return this.findOne({_id: userId})
//     .exec()
//     .then((user) => {
//       if (user) {
//         user.capacity= capacity;
//         user.save();
//         return user;
//       }
//       const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
//       return Promise.reject(err);
//     });
// };

// UserSchema.statics.updateMap = (userId, fileMap) => {
//   return this.findOne({_id: userId})
//     .exec()
//     .then((user) => {
//       if (user) {
//         user.fileMap = fileMap;
//         user.save();          //we assume that it is possible to save here
//         return user;
//       }
//       const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
//       return Promise.reject(err);
//     });
// };



  /**
   * List users in descending order of 'createdAt' timestamp.

  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .skip(skip)
      .limit(limit)
      .exec();
  }
};*/


export default mongoose.model('User', UserSchema);
