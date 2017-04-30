import express from 'express';
// import validate from 'express-validation';
// import paramValidation from '../../config/param-validation';
import shredsManagerCtrl from '../controllers/ShredsManager.controller';

const router = express.Router(); // eslint-disable-line new-cap

// NOTE TO FUTURE-SELF: validate(paramValidation.create)

/** POST /api/shreds/new - get new hosts for shreds */
// Params: userId, nShreds, lastSize
// Returns: [ShredHost]
router.post('/new', shredsManagerCtrl.store);

/** GET /api/shreds/get_hosts - retrieve list of hosts for shreds */
// Params : userId, [shredId]
// Returns: [ShredHost]
router.get('/get_hosts', shredsManagerCtrl.retrieve);

/** DELETE /api/shreds/delete - update_capacity */
// Params : userId, [shredId], fileMap
// Returns: [shredId]
router.delete('/delete', shredsManagerCtrl.remove);

export default router;
