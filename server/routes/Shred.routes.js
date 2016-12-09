import express from 'express';
import shredsManagerCtrl from '../controllers/ShredsManager.controller';

const router = express.Router(); // eslint-disable-line new-cap

// NOTE TO FUTURE-SELF: Use req.body instead
router.post('/new/:userId/:nShreds/:lastSize', shredsManagerCtrl.store);

// req.body: {shredIds}
router.get('/get_hosts', shredsManagerCtrl.retrieve);

// req.body: {fileMap, [shredIds], userId}
router.delete('/delete', shredsManagerCtrl.remove);

export default router;
