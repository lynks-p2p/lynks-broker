import express from 'express';
import shredsManagerCtrl from '../controllers/ShredsManager.controller';

const router = express.Router(); // eslint-disable-line new-cap

// NOTE TO FUTURE-SELF: Use req.body instead
router.post('/new/:userId/:nShreds/:lastSize', shredsManagerCtrl.store);


router.get('/get_hosts', shredsManagerCtrl.retrieve);


router.delete('/delete', shredsManagerCtrl.remove);

export default router;
