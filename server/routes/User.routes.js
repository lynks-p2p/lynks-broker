import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/User.controller';

const router = express.Router(); // eslint-disable-line new-cap

  /** POST /api/users - signup */
router.post('/signup/:username/:capacity', validate(paramValidation.createUser), userCtrl.create);

  /** POST /api/users - signin */
router.post('/signin/:username', validate(paramValidation.login), userCtrl.get);

  //** PUT /api/users/:capacity - update_capacity */
router.put('/update_capacity/:userId/:capacity',validate(paramValidation.updateUser), userCtrl.updateCapacity);

  /** DELETE /api/users/:userId - leave */
router.delete('/leave/:userId',userCtrl.remove);

export default router;
