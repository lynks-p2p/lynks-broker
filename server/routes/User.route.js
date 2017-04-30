import express from 'express';
// import validate from 'express-validation';
// import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/User.controller';

const router = express.Router(); // eslint-disable-line new-cap

// NOTE TO FUTURE-SELF: validate(paramValidation.create)

/** POST /api/users - signup */
// Params: username, capacity
// Returns: User
router.post('/signup', userCtrl.create);

/** POST /api/users - signin */
// Expected params in res.body: userId
// Returns: User
router.post('/signin', userCtrl.get);

/** PUT /api/users - update_capacity */
// Expected params in res.body: userId, capacity
// Returns: User
router.put('/update_capacity', userCtrl.updateCapacity);

/** PUT /api/users - update_capacity */
// Expected params in res.body: userId, fileMap
// Returns: User
router.put('/update_filemap', userCtrl.updateFilemap);

/** DELETE /api/users/ - leave */
// Expected params in res.body: userId, fileMap
// Returns: User
router.delete('/leave', userCtrl.remove);

export default router;
